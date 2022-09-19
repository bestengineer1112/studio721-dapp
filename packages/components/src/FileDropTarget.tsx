import { DragEvent, memo, ReactNode, useCallback } from 'react';
import styled from 'styled-components';
import { useFileDropTarget } from 'hooks';
import React from 'react';

export type TypedFile<T> = File & { type: T };

export function isSupportedFile<T extends string>(
  file: File,
  supportedFileTypes: T[],
): file is TypedFile<T> {
  return supportedFileTypes.includes(file.type as T);
}

interface Props<T extends string> {
  children: ReactNode | ((isActive: boolean) => ReactNode);
  onDropFiles: (
    file: TypedFile<T>[],
    offsetPoint: { offsetX: number; offsetY: number },
  ) => void;
  supportedFileTypes?: T[];
}

const Container = styled.div(() => ({ display: 'flex', flex: 1 }));

export const FileDropTarget = memo(function FileDropTarget<T extends string>({
  children,
  onDropFiles,
  supportedFileTypes,
}: Props<T>) {
  const handleFile = useCallback(
    (event: DragEvent) => {
      event.preventDefault();

      const offsetPoint = {
        offsetX: event.nativeEvent.offsetX,
        offsetY: event.nativeEvent.offsetY,
      };

      const unsupportedTypes = supportedFileTypes
        ? [...event.dataTransfer.files].flatMap((file) => {
            if (!isSupportedFile(file, supportedFileTypes)) {
              return [file.type];
            } else {
              return [];
            }
          })
        : [];

      if (unsupportedTypes.length > 0) {
        alert(
          `Files of type ${unsupportedTypes.join(
            ', ',
          )} aren't supported. The following types are supported: ${supportedFileTypes?.join(
            ', ',
          )}`,
        );
      }

      const files = [...event.dataTransfer.files].flatMap((file) =>
        !supportedFileTypes || isSupportedFile(file, supportedFileTypes)
          ? [file]
          : [],
      );

      onDropFiles(files as TypedFile<T>[], offsetPoint);
    },
    [onDropFiles, supportedFileTypes],
  );

  const { dropTargetProps, isDropTargetActive } = useFileDropTarget(handleFile);

  return (
    <Container {...dropTargetProps}>
      {typeof children === 'function' ? children(isDropTargetActive) : children}
    </Container>
  );
});
