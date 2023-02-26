// import React, { useState } from 'react';
// import { Menu, MenuItem, IconButton } from '@material-ui/lab';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
//
// export default function Option() {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);
//
//   const handleOpenMenu = (event) => {
//     setAnchorEl(event.currentTarget);
//     setIsOpen(true);
//   };
//
//   const handleCloseMenu = () => {
//     setAnchorEl(null);
//     setIsOpen(false);
//   };
//
//   const handleSelectItem = (event, item) => {
//     setSelectedItem(item);
//     handleCloseMenu();
//   };
//
//   return (
//     <>
//       <IconButton onClick={handleOpenMenu}>
//         <MoreVertIcon/>
//       </IconButton>
//       <Menu anchorEl={anchorEl} open={isOpen} onClose={handleCloseMenu}>
//         <MenuItem onClick={(event) => handleSelectItem(event, 'Option 1')}>
//           Option 1
//         </MenuItem>
//         <MenuItem onClick={(event) => handleSelectItem(event, 'Option 2')}>
//           Option 2
//         </MenuItem>
//         <MenuItem onClick={(event) => handleSelectItem(event, 'Option 3')}>
//           Option 3
//         </MenuItem>
//       </Menu>
//     </>
//   )
// }
