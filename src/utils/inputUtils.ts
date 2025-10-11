import React from 'react';

export const shouldSendMessage = (e: React.KeyboardEvent<HTMLTextAreaElement>, userInput: string, isFileUploading: boolean = false): boolean => {
  return e.key === "Enter" && !e.shiftKey && !!userInput && !isFileUploading;
};

export const insertNewlineAtCursor = (
  e: React.KeyboardEvent<HTMLTextAreaElement>,
  userInput: string,
  setUserInput: (value: string) => void
) => {
  const textarea = e.currentTarget;
  const { selectionStart, selectionEnd } = textarea;
  const beforeCursor = userInput.slice(0, selectionStart);
  const afterCursor = userInput.slice(selectionEnd);
  const newValue = `${beforeCursor}\n${afterCursor}`;
  setUserInput(newValue);
  requestAnimationFrame(() => {
    textarea.selectionStart = textarea.selectionEnd = selectionStart + 1;
  });
};

export const isEnterWithoutShift = (e: React.KeyboardEvent<HTMLTextAreaElement>): boolean => {
  return e.key === "Enter" && !e.shiftKey;
};

export const isEnterWithShift = (e: React.KeyboardEvent<HTMLTextAreaElement>): boolean => {
  return e.key === "Enter" && e.shiftKey;
};
