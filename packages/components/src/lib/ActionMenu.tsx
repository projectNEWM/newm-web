import { FunctionComponent, MouseEvent, ReactNode } from "react";

import {
  Box,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  PopoverOrigin,
  TooltipProps,
} from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";

import { Tooltip } from "@newm-web/elements";
import theme from "@newm-web/theme";

export type ActionMenuItem = {
  readonly color?: "default" | "danger";
  readonly disabled?: boolean;
  readonly dividerAbove?: boolean;
  readonly icon?: ReactNode;
  readonly id: string;
  readonly label: string;
  readonly link?: {
    readonly href: string;
    readonly rel?: string;
    readonly target?: string;
  };
  readonly onClick?: (event: MouseEvent<HTMLLIElement>) => void;
  readonly tooltip?: ReactNode;
  readonly tooltipPlacement?: TooltipProps["placement"];
};

interface ActionMenuProps {
  readonly anchorEl: HTMLElement | null;
  readonly anchorOrigin?: PopoverOrigin;
  readonly closeOnSelect?: boolean;
  readonly itemSx?: SxProps<Theme>;
  readonly items: ReadonlyArray<ActionMenuItem>;
  readonly menuListSx?: SxProps<Theme>;
  readonly menuPaperSx?: SxProps<Theme>;
  readonly minWidth?: number | string;
  readonly onClose: () => void;
  readonly open: boolean;
  readonly showDividers?: boolean;
  readonly stopPropagation?: boolean;
  readonly transformOrigin?: PopoverOrigin;
}

const DEFAULT_ANCHOR_ORIGIN: PopoverOrigin = {
  horizontal: "left",
  vertical: "bottom",
};
const DEFAULT_TRANSFORM_ORIGIN: PopoverOrigin = {
  horizontal: "right",
  vertical: "top",
};

const ActionMenu: FunctionComponent<ActionMenuProps> = ({
  anchorEl,
  anchorOrigin = DEFAULT_ANCHOR_ORIGIN,
  closeOnSelect = true,
  itemSx,
  items,
  menuListSx,
  menuPaperSx,
  minWidth = "192px",
  onClose,
  open,
  showDividers = true,
  stopPropagation = true,
  transformOrigin = DEFAULT_TRANSFORM_ORIGIN,
}) => {
  const handleMenuClick = (event: MouseEvent) => {
    if (stopPropagation) {
      event.stopPropagation();
    }
  };

  const getItemColor = (item: ActionMenuItem) => {
    if (item.disabled) {
      return theme.colors.grey100;
    }

    if (item.color === "danger") {
      return theme.colors.red;
    }

    return theme.colors.white;
  };

  const handleItemClick =
    (item: ActionMenuItem) => (event: MouseEvent<HTMLLIElement>) => {
      if (stopPropagation) {
        event.stopPropagation();
      }

      item.onClick?.(event);

      if (closeOnSelect) {
        onClose();
      }
    };

  return (
    <Menu
      anchorEl={ anchorEl }
      anchorOrigin={ anchorOrigin }
      MenuListProps={ {
        sx: {
          paddingBottom: 0,
          paddingTop: 0,
          ...menuListSx,
        },
      } }
      open={ open }
      slotProps={ {
        paper: {
          sx: {
            backgroundColor: theme.colors.grey600,
            border: `2px solid ${theme.colors.grey500}`,
            borderRadius: "4px",
            minWidth,
            paddingBottom: 0,
            paddingTop: 0,
            ...menuPaperSx,
          },
        },
      } }
      transformOrigin={ transformOrigin }
      onClick={ handleMenuClick }
      onClose={ onClose }
    >
      { items.map((item, index) => {
        const itemColor = getItemColor(item);
        const shouldShowDivider =
          showDividers && index < items.length - 1 && !item.dividerAbove;

        const linkRel =
          item.link?.target === "_blank" && !item.link.rel
            ? "noopener noreferrer"
            : item.link?.rel;

        const linkProps = item.link
          ? {
              component: "a" as const,
              href: item.link.href,
              rel: linkRel,
              style: {
                width: "100%",
              },
              target: item.link.target,
            }
          : {};

        const menuItem = (
          <MenuItem
            disabled={ item.disabled }
            { ...linkProps }
            sx={ {
              "&:hover": {
                backgroundColor: theme.colors.grey500,
              },
              color: itemColor,
              cursor: item.disabled ? "not-allowed" : "pointer",
              paddingX: 2,
              paddingY: 1.25,
              ...itemSx,
            } }
            onClick={ handleItemClick(item) }
          >
            <ListItemIcon
              sx={ {
                color: itemColor,
                minWidth: 0,
                opacity: item.icon ? 1 : 0,
                width: "20px",
              } }
            >
              { item.icon }
            </ListItemIcon>
            <ListItemText primary={ item.label } />
          </MenuItem>
        );

        return (
          <Box key={ item.id }>
            { item.dividerAbove && (
              <Divider
                sx={ {
                  backgroundColor: theme.colors.grey500,
                  height: "2px",
                  margin: "0 !important",
                } }
              />
            ) }
            { item.tooltip ? (
              <Tooltip placement={ item.tooltipPlacement } title={ item.tooltip }>
                <Box component="span" sx={ { display: "flex" } }>
                  { menuItem }
                </Box>
              </Tooltip>
            ) : (
              menuItem
            ) }
            { shouldShowDivider && (
              <Divider
                sx={ {
                  backgroundColor: theme.colors.grey500,
                  height: "2px",
                  margin: "0 !important",
                } }
              />
            ) }
          </Box>
        );
      }) }
    </Menu>
  );
};

export default ActionMenu;
