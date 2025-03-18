import React, { useState } from 'react';
import { LeadStatus } from '../../types/lead.types';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { Card } from '../ui/Card';
import { AddCommentForm } from './AddCommentForm';

interface StatusButtonsProps {
  currentStatus: LeadStatus;
  onStatusChange: (newStatus: LeadStatus, comment?: string) => void;
  isUpdating: boolean;
  leadId: string;
}

export const StatusButtons: React.FC<StatusButtonsProps> = ({
  currentStatus,
  onStatusChange,
  isUpdating,
  leadId,
}) => {
  const [pendingStatus, setPendingStatus] = useState<LeadStatus | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);

  const statusOptions: LeadStatus[] = ['New', 'Engaging', 'Proposal', 'Closed Win', 'Closed Missed'];

  const handleStatusClick = (status: LeadStatus) => {
    if (status === currentStatus) return;
    setPendingStatus(status);
    setShowConfirmation(true);
  };

  const confirmStatusChange = () => {
    setShowConfirmation(false);
    setShowCommentForm(true); // Show the comment form after confirmation
  };

  const cancelStatusChange = () => {
    setPendingStatus(null);
    setShowConfirmation(false);
  };

  const handleAddComment = async (commentText: string, selectedStatus: LeadStatus) => {
    if (pendingStatus) {
      onStatusChange(pendingStatus, commentText); // Pass the comment to the parent
      setPendingStatus(null); // Reset pendingStatus after the change
      setShowCommentForm(false);
    }
  };

  const isStatusDisabled = (status: LeadStatus): boolean => {
    const currentIndex = statusOptions.indexOf(currentStatus);
    const statusIndex = statusOptions.indexOf(status);

    // Disable all previous statuses once a later status is selected
    return statusIndex < currentIndex;
  };

  return (
    <>
      <Card title="Lead Status" className="mb-6">
        <div className="flex flex-wrap gap-2">
          {statusOptions.map((status) => {
            const isActive = status === currentStatus;
            const isDisabled = isStatusDisabled(status);

            let buttonVariant: 'primary' | 'secondary' | 'outline' = 'outline';
            if (isActive) buttonVariant = 'primary';

            return (
              <Button
                key={status}
                variant={buttonVariant}
                disabled={isDisabled || isActive || isUpdating}
                onClick={() => handleStatusClick(status)}
                className={`flex-1 ${isActive ? 'ring-2 ring-offset-2 ring-indigo-500' : ''}`}
              >
                {status}
              </Button>
            );
          })}
        </div>
      </Card>

      {/* Confirmation Modal */}
      <Modal
        isOpen={showConfirmation}
        onClose={cancelStatusChange}
        title="Confirm Status Change"
        footer={
          <div className="flex gap-3 justify-end w-full">
            <Button variant="outline" onClick={cancelStatusChange}>
              Cancel
            </Button>
            <Button variant="primary" onClick={confirmStatusChange}>
              Confirm
            </Button>
          </div>
        }
      >
        <div className="py-3">
          <p className="text-gray-700 mb-4">
            You are about to change the lead status from{' '}
            <span className="font-semibold">{currentStatus}</span> to{' '}
            <span className="font-semibold">{pendingStatus}</span>.
          </p>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <strong>Warning:</strong> Once changed, you cannot move back to previous stages.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* Comment Form Modal */}
      <Modal
        isOpen={showCommentForm}
        onClose={() => setShowCommentForm(false)}
        title=" "
        footer={null} // Footer is handled inside AddCommentForm
      >
        <AddCommentForm
          leadId={leadId}
          currentStatus={pendingStatus || currentStatus}
          onAddComment={handleAddComment}
          isSubmitting={isUpdating}
        />
      </Modal>
    </>
  );
};