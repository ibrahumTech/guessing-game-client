import React from "react";
import { createUseStyles, useTheme } from "react-jss";

const useStyles = createUseStyles({
  outer: {
    height: 0,
    position: 'relative',
    overflow: 'hidden'
  },
  inner: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    left: 0,
    right: 0
  },
  element: {
    width: '100%',
    height: '100%'
  }
});


type IFixedAspectRatioContainerProps = {
  className: any;
  ratio: string;
  children : any
}


export const FixedAspectRatioContainer: React.FunctionComponent<IFixedAspectRatioContainerProps> = ({ children, className, ratio }) => {
  const theme : any = useTheme();
  const styles = useStyles({ theme });
  
  return (
    <div className={`${styles.outer} ${className}`} style={{ paddingBottom: ratio }}>
      <div className={styles.inner}>
        {children}
      </div>
    </div>
  )
};

type IFixedAspectRatioElementProps = {
  alt?: string;
  el?: any;
  children : any;
}

export const FixedAspectRatioElement: React.FunctionComponent<IFixedAspectRatioElementProps> = ({ alt, el, ...rest }) => {
  const theme : any = useTheme();
  const styles = useStyles({ theme });
  const El = el || 'img';
  
  return (
    <El className={styles.element} alt={alt} {...rest} />
  );
}

