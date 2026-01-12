import React, { useState } from 'react';
import { Loader } from 'lucide-react';

interface Contact {
    id: number;
    name: string;
    email: string;
    status: string;
    lead_score: number;
    company?: string;
}

interface KanbanProps {
    contacts: Contact[];
    onUpdateStatus: (id: number, newStatus: string) => void;
    isLoading?: boolean;
}

const COLUMNS = [
    { id: 'New', label: 'New Leads', color: 'bg-blue-100 border-blue-200' },
    { id: 'Contacted', label: 'Contacted', color: 'bg-yellow-100 border-yellow-200' },
    { id: 'Qualified', label: 'Qualified', color: 'bg-purple-100 border-purple-200' },
    { id: 'Proposal', label: 'Proposal Sent', color: 'bg-indigo-100 border-indigo-200' },
    { id: 'Closed-Won', label: 'Won 💰', color: 'bg-green-100 border-green-200' },
    { id: 'Lost', label: 'Lost', color: 'bg-red-50 border-red-200' }
];

const KanbanBoard: React.FC<KanbanProps> = ({ contacts, onUpdateStatus, isLoading }) => {
    const [draggedId, setDraggedId] = useState<number | null>(null);

    const handleDragStart = (e: React.DragEvent, id: number) => {
        setDraggedId(id);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent, status: string) => {
        e.preventDefault();
        if (draggedId !== null) {
            onUpdateStatus(draggedId, status);
            setDraggedId(null);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader className="w-8 h-8 animate-spin text-blue-500" />
            </div>
        );
    }

    return (
        <div className="flex overflow-x-auto gap-4 p-4 min-h-[600px]">
            {COLUMNS.map(col => {
                const colContacts = contacts.filter(c => c.status === col.id || (!c.status && col.id === 'New'));

                return (
                    <div
                        key={col.id}
                        className={`flex-shrink-0 w-72 rounded-xl border ${col.color} p-4 flex flex-col`}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, col.id)}
                    >
                        <h3 className="font-bold text-gray-700 mb-4 flex justify-between items-center">
                            {col.label}
                            <span className="bg-white/50 px-2 py-1 rounded-full text-xs text-gray-600">
                                {colContacts.length}
                            </span>
                        </h3>

                        <div className="flex-1 space-y-3 overflow-y-auto">
                            {colContacts.map(contact => (
                                <div
                                    key={contact.id}
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, contact.id)}
                                    className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 cursor-move hover:shadow-md transition-shadow group"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="font-semibold text-gray-800 truncate">{contact.name}</span>
                                        {contact.lead_score >= 40 && (
                                            <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-bold">
                                                🔥 {contact.lead_score}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-500 truncate mb-1">{contact.email}</p>
                                    {contact.company && (
                                        <p className="text-xs text-blue-600 font-medium truncate">{contact.company}</p>
                                    )}
                                    <div className="mt-2 text-xs text-gray-400 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                                        Drag to move
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default KanbanBoard;
