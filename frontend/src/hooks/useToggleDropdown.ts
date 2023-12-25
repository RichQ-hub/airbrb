import React, { useState } from 'react';

/**
 * Stateful logic to handle opening and closing of a
 * dropdown.
 */
const useToggleDropdown = (initial: boolean) => {
  const [isOpen, setIsOpen] = useState<boolean>(initial);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  }

  return {
    isOpen,
    handleToggleDropdown,
  }
}

export default useToggleDropdown