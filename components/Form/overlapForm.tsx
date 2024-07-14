import React from 'react';
import OverlapFormLayout from '@/components/Form/overlapFormLayout';

export default function OverlapForm(
  isModalOpen,
  setIsModalOpen,
  currentForm,
  modalHeader: string,
) {
  return (
    <div>
      {isModalOpen && (
        <OverlapFormLayout
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          FormComponent={currentForm}
          formHeader={modalHeader}
        />
      )}
    </div>
  );
}
