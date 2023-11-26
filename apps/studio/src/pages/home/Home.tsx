import { Box, IconButton } from '@mui/material';
import { FunctionComponent, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import {
  emptyProfile,
  useGetProfileQuery,
} from '@newm.io/studio/modules/session';
import SideBar from './SideBar';
import UploadSong from './uploadSong/UploadSong';
import Library from './library/Library';
import Owners from './owners/Owners';
import Wallet from './wallet/Wallet';
import Profile from './profile/Profile';
import Settings from './settings/Settings';

const Home: FunctionComponent = () => {
  const drawerWidth = 230;
  const theme = useTheme();
  const navigate = useNavigate();

  const [isMobileOpen, setMobileOpen] = useState(false);

  const {
    data: { firstName = '', lastName = '', role } = emptyProfile,
    isLoading,
  } = useGetProfileQuery();

  const hasBasicDetails = !!(firstName && lastName && role);

  if (!hasBasicDetails && !isLoading) {
    navigate('/create-profile');

    return null;
  }

  if (isLoading) return null;

  return (
    <Box
      sx={{
        backgroundColor: theme.colors.black,
        display: 'flex',
        flexGrow: 1,
      }}
    >
      <SideBar isMobileOpen={isMobileOpen} setMobileOpen={setMobileOpen} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          paddingY: 10.5,
          paddingX: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          marginLeft: { md: 30 },
        }}
      >
        <Box position="absolute" left="2rem" top="2rem">
          <IconButton onClick={() => setMobileOpen(true)}>
            <MenuIcon sx={{ color: 'white' }} />
          </IconButton>
        </Box>
        <Routes>
          <Route path="" element={<Navigate to="upload-song" replace />} />

          <Route path="upload-song/*" element={<UploadSong />} />
          <Route path="library/*" element={<Library />} />
          <Route path="collaborators/*" element={<Owners />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default Home;
