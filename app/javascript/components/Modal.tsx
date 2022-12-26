import * as React from "react";
import { animated, useTransition } from "react-spring";

interface ModalProps {
  isOpen: boolean;
  transitionFrom?: string;
  children: React.ReactNode;
  setIsOpen: (value: boolean) => void;
  additionalStyles: React.CSSProperties;
}

export const Modal = ({
  transitionFrom = "-80vh",
  children,
  isOpen,
  setIsOpen,
  additionalStyles,
}: ModalProps) => {
  const heightTransitions = useTransition(isOpen, {
    from: {
      width: "100%",
      height: "100vh",
      zIndex: 1,
      top: 0,
      lef: 0,
      right: transitionFrom,
      bottom: 0,
      margin: "auto",
      ...additionalStyles,
    },
    enter: { opacity: 1, right: "0" },
    leave: { opacity: 0, right: transitionFrom },
  });
  const backgroundTransitions = useTransition(isOpen, {
    from: {
      width: "100%",
      height: "100vh",
      zIndex: -1,
      opacity: 0,
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      backgroundColor: "#000000",
      margin: "auto",
    },
    enter: { opacity: 0.5 },
    leave: { opacity: 0 },
  });

  return heightTransitions(
    (styles, item) =>
      item && (
        <animated.div
          style={{
            position: "fixed",
            ...styles,
          }}
        >
          {backgroundTransitions(
            (styles, item) =>
              item && (
                <animated.div
                  style={{
                    position: "fixed",
                    ...styles,
                  }}
                  onClick={() => setIsOpen(false)}
                />
              )
          )}
          {children}
        </animated.div>
      )
  );
};
