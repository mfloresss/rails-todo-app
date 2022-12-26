import * as React from "react";
import { useEffect, useState } from "react";
import { randomGradientColor } from "../../helpers/randomGradientColor";
import "./styles.css";

interface GradientCardProps {
  getGradientColor?: ({ firstColor, secondColor }) => void;
  children: React.ReactNode;
}

export interface CardGradientColorsProps {
  firstColor: string;
  secondColor: string;
}

export const GradientCard = ({
  getGradientColor,
  children,
  ...rest
}: GradientCardProps & React.HTMLAttributes<HTMLDivElement>) => {
  const [{ firstColor, secondColor }, setCardGradientColors] =
    useState<CardGradientColorsProps>({
      firstColor: null,
      secondColor: null,
    });

  useEffect(() => {
    // generate random gradient color form the array
    const [firstColor, secondColor] = randomGradientColor();

    setCardGradientColors({
      firstColor: firstColor,
      secondColor: secondColor,
    });

    getGradientColor && getGradientColor({ firstColor, secondColor });
  }, []);

  const styles = {
    // background: `-webkit-linear-gradient(to right, ${firstColor}, ${secondColor})`,
    background: `linear-gradient(to right, ${firstColor}, ${secondColor})`,
  };

  return (
    <div className="gradient-card" style={styles} {...rest}>
      {children}
    </div>
  );
};
