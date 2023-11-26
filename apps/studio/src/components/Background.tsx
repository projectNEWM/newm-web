/**
 * Fixed position background image with darkened overlay.
 */

import { styled } from '@mui/material/styles';
import { ReactNode } from 'react';

interface BackgroundProps {
  children: ReactNode;
}

const BackgroundImage = styled('div')({
  position: 'relative',
  display: 'flex',
  flexGrow: 1,
  backgroundImage: 'url("https://i.postimg.cc/TPTmSRWB/bg-img.png")',
  backgroundPosition: 'center',
  backgroundRepeat: 'repeat',
  backgroundSize: 'cover',
  width: '100%',
  height: '100%',
});

const BackgroundOverlay = styled('div')({
  display: 'flex',
  backgroundColor: 'rgba(0, 0, 0, 0.25)',
  bottom: 0,
  left: 0,
  position: 'absolute',
  right: 0,
  top: 0,
});

const Background = ({ children }: BackgroundProps) => (
  <BackgroundImage>
    <BackgroundOverlay>{children}</BackgroundOverlay>
  </BackgroundImage>
);

export default Background;
