const API_URL = 'http://localhost:5000/api';

let authToken = localStorage.getItem('adminToken');
let currentTab = 'overview';

// Initialize
if (authToken) {
    showDashboard();
} else {
    showLogin();
}

// Login
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('loginError');

    try {
        const response = await fetch(`${API_URL}/admin/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Login failed');
        }

        authToken = data.token;
        localStorage.setItem('adminToken', authToken);
        document.getElementById('adminName').textContent = data.user.username;
        showDashboard();
    } catch (error) {
        console.error('Login error:', error);
        let errorMessage = error.message;
        
        // Provide helpful error messages
        if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
            errorMessage = 'Cannot connect to server. Make sure backend is running on port 5000.';
        } else if (error.message.includes('Invalid credentials')) {
            errorMessage = 'Invalid username or password. If this is your first time, you need to create an admin user.';
        }
        
        errorDiv.textContent = errorMessage;
        errorDiv.classList.remove('hidden');
        
        // Show helpful message for first-time users
        if (error.message.includes('Invalid credentials')) {
            const helpDiv = document.createElement('div');
            helpDiv.className = 'mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm';
            helpDiv.innerHTML = `
                <strong>First time setup?</strong><br>
                You need to create an admin user first. Run this in PowerShell:<br>
                <code class="bg-gray-100 p-2 rounded block mt-2">
                $body = @{username="admin";password="admin123";email="admin@test.com"} | ConvertTo-Json<br>
                Invoke-RestMethod -Uri "http://localhost:5000/api/admin/create" -Method Post -ContentType "application/json" -Body $body
                </code>
                <p class="mt-2">Or double-click <code>create-admin.ps1</code> in the project root.</p>
            `;
            errorDiv.parentElement.appendChild(helpDiv);
        }
    }
});

// Logout
document.getElementById('logoutBtn')?.addEventListener('click', () => {
    localStorage.removeItem('adminToken');
    authToken = null;
    showLogin();
});

// Tab switching
document.querySelectorAll('.tab-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const tab = e.currentTarget.dataset.tab;
        switchTab(tab);
    });
});

function switchTab(tab) {
    currentTab = tab;
    
    // Update active tab
    document.querySelectorAll('.tab-link').forEach(link => {
        if (link.dataset.tab === tab) {
            link.classList.add('bg-indigo-50', 'text-indigo-600', 'font-semibold');
            link.classList.remove('text-gray-700');
        } else {
            link.classList.remove('bg-indigo-50', 'text-indigo-600', 'font-semibold');
            link.classList.add('text-gray-700');
        }
    });

    // Show/hide content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.add('hidden');
    });
    document.getElementById(`${tab}Tab`).classList.remove('hidden');

    // Load tab data
    if (tab === 'overview') loadOverview();
    if (tab === 'contacts') loadContacts();
    if (tab === 'analytics') loadAnalytics();
}

function showLogin() {
    document.getElementById('loginScreen').classList.remove('hidden');
    document.getElementById('dashboardScreen').classList.add('hidden');
}

function showDashboard() {
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('dashboardScreen').classList.remove('hidden');
    loadOverview();
}

// Load Overview
async function loadOverview() {
    try {
        const response = await fetch(`${API_URL}/admin/analytics`, {
            headers: { 'Authorization': `Bearer ${authToken}` }
        });
        const data = await response.json();

        document.getElementById('totalContacts').textContent = data.totalSubmissions || 0;
        document.getElementById('totalSubmissions').textContent = data.totalSubmissions || 0;
        document.getElementById('totalViews').textContent = data.totalViews || 0;

        // Daily stats chart
        const ctx = document.getElementById('dailyStatsChart');
        if (ctx && data.dailyStats) {
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: data.dailyStats.map(d => d._id),
                    datasets: [{
                        label: 'Views',
                        data: data.dailyStats.map(d => d.views),
                        borderColor: 'rgb(99, 102, 241)',
                        tension: 0.1
                    }, {
                        label: 'Submissions',
                        data: data.dailyStats.map(d => d.submissions),
                        borderColor: 'rgb(34, 197, 94)',
                        tension: 0.1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { position: 'top' }
                    }
                }
            });
        }
    } catch (error) {
        console.error('Load overview error:', error);
    }
}

// Load Contacts
async function loadContacts() {
    try {
        const statusFilter = document.getElementById('statusFilter').value;
        const url = `${API_URL}/admin/contacts${statusFilter ? `?status=${statusFilter}` : ''}`;
        
        const response = await fetch(url, {
            headers: { 'Authorization': `Bearer ${authToken}` }
        });
        const data = await response.json();

        const tbody = document.getElementById('contactsTableBody');
        tbody.innerHTML = '';

        data.contacts.forEach(contact => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${contact.name}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${contact.email}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${contact.phone}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${contact.service}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <select class="status-select text-sm border rounded px-2 py-1" data-id="${contact._id}">
                        <option value="new" ${contact.status === 'new' ? 'selected' : ''}>New</option>
                        <option value="contacted" ${contact.status === 'contacted' ? 'selected' : ''}>Contacted</option>
                        <option value="converted" ${contact.status === 'converted' ? 'selected' : ''}>Converted</option>
                        <option value="archived" ${contact.status === 'archived' ? 'selected' : ''}>Archived</option>
                    </select>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${new Date(contact.createdAt).toLocaleDateString()}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <button class="view-contact text-indigo-600 hover:text-indigo-900" data-id="${contact._id}">View</button>
                </td>
            `;
            tbody.appendChild(row);
        });

        // Add event listeners for status changes
        document.querySelectorAll('.status-select').forEach(select => {
            select.addEventListener('change', async (e) => {
                const contactId = e.target.dataset.id;
                const newStatus = e.target.value;
                await updateContactStatus(contactId, newStatus);
            });
        });
    } catch (error) {
        console.error('Load contacts error:', error);
    }
}

async function updateContactStatus(contactId, status) {
    try {
        const response = await fetch(`${API_URL}/admin/contacts/${contactId}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status })
        });

        if (response.ok) {
            loadContacts();
        }
    } catch (error) {
        console.error('Update status error:', error);
    }
}

// Load Analytics
async function loadAnalytics() {
    try {
        const response = await fetch(`${API_URL}/admin/analytics`, {
            headers: { 'Authorization': `Bearer ${authToken}` }
        });
        const data = await response.json();

        // UTM Chart
        const utmCtx = document.getElementById('utmChart');
        if (utmCtx && data.utmBreakdown) {
            new Chart(utmCtx, {
                type: 'doughnut',
                data: {
                    labels: data.utmBreakdown.map(u => u._id || 'Direct'),
                    datasets: [{
                        data: data.utmBreakdown.map(u => u.count),
                        backgroundColor: [
                            'rgb(99, 102, 241)',
                            'rgb(34, 197, 94)',
                            'rgb(251, 146, 60)',
                            'rgb(239, 68, 68)',
                            'rgb(168, 85, 247)'
                        ]
                    }]
                }
            });
        }

        // Event Chart
        const eventCtx = document.getElementById('eventChart');
        if (eventCtx) {
            new Chart(eventCtx, {
                type: 'bar',
                data: {
                    labels: ['Page Views', 'Form Submissions', 'Chatbot'],
                    datasets: [{
                        label: 'Events',
                        data: [data.totalViews || 0, data.totalSubmissions || 0, data.totalChatbot || 0],
                        backgroundColor: [
                            'rgb(99, 102, 241)',
                            'rgb(34, 197, 94)',
                            'rgb(168, 85, 247)'
                        ]
                    }]
                }
            });
        }
    } catch (error) {
        console.error('Load analytics error:', error);
    }
}

// Refresh contacts
document.getElementById('refreshContacts')?.addEventListener('click', loadContacts);
document.getElementById('statusFilter')?.addEventListener('change', loadContacts);

// Export
document.getElementById('exportBtn')?.addEventListener('click', async () => {
    try {
        const response = await fetch(`${API_URL}/admin/contacts?limit=10000`, {
            headers: { 'Authorization': `Bearer ${authToken}` }
        });
        const data = await response.json();

        // Convert to CSV
        const headers = ['Name', 'Email', 'Phone', 'Company', 'Service', 'Message', 'Status', 'Date'];
        const rows = data.contacts.map(c => [
            c.name, c.email, c.phone, c.company || '', c.service, c.message || '', c.status,
            new Date(c.createdAt).toLocaleDateString()
        ]);

        const csv = [headers.join(','), ...rows.map(r => r.map(cell => `"${cell}"`).join(','))].join('\n');
        
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `contacts-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
    } catch (error) {
        console.error('Export error:', error);
        alert('Failed to export contacts');
    }
});

