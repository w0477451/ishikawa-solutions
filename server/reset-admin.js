import { Sequelize, DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false,
        dialectOptions: {
            ssl: {
                require: false,
                rejectUnauthorized: false
            }
        }
    }
);

const Admin = sequelize.define('Admin', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, defaultValue: 'admin' }
});

const resetAdmin = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Connected to DB');

        await Admin.sync({ alter: true });

        const username = 'admin';
        const password = 'admin123';
        const email = 'admin@ishikawa.com';

        const hashedPassword = await bcrypt.hash(password, 10);

        const existingAdmin = await Admin.findOne({ where: { username } });

        if (existingAdmin) {
            existingAdmin.password = hashedPassword;
            await existingAdmin.save();
            console.log('✅ Admin password RESET to: admin123');
        } else {
            await Admin.create({
                username,
                password: hashedPassword,
                email
            });
            console.log('✅ Admin user CREATED. Username: admin, Password: admin123');
        }

        process.exit(0);

    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
};

resetAdmin();
