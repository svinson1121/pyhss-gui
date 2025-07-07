import React from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {MenuItem} from '@components';
import {PfImage} from '@profabric/react-components';
import styled from 'styled-components';
import i18n from '@app/utils/i18n';

export interface IMenuItem {
  name: string;
  icon?: string;
  path?: string;
  children?: Array<IMenuItem>;
}

export const MENU: IMenuItem[] = [
  {
    name: i18n.t('menusidebar.label.dashboard'),
    icon: 'fas fa-tachometer-alt nav-icon',
    path: '/'
  },
  {
    name: i18n.t('menusidebar.label.apn'),
    icon: 'fas fa-wifi nav-icon',
    path: '/apn'
  },
  {
    name: i18n.t('menusidebar.label.auc'),
    icon: 'fas fa-sim-card nav-icon',
    path: '/auc'
  },
  {
    name: i18n.t('menusidebar.label.subscriber'),
    icon: 'fas fa-users nav-icon',
    path: '/subscriber'
  },
  {
    name: i18n.t('menusidebar.label.imssubscriber'),
    icon: 'fas fa-user-tie nav-icon',
    path: '/imssubscriber'
  },
  {
    name: i18n.t('menusidebar.label.tft'),
    icon: 'fas fa-shield-alt nav-icon',
    path: '/tft'
  },
  {
    name: i18n.t('menusidebar.label.chargingrule'),
    icon: 'fas fa-search-dollar nav-icon',
    path: '/chargingrule'
  },
  {
    name: i18n.t('menusidebar.label.eir'),
    icon: 'fas fa-database nav-icon',
    path: '/eir'
  },
  { name: 'Roaming',
    icon: 'fas fa-broom nav-icon',
    children: [
  {
    name: i18n.t('menusidebar.label.roamingnetwork'),
    icon: 'fas fa-network-wired nav-icon',
    path: '/roamingnetwork'
  },
  {
    name: i18n.t('menusidebar.label.roamingrule'),
    icon: 'fas fa-book nav-icon',
    path: '/roamingrule'
  }]},
  {
    name: "Subscriber wizard",
    icon: 'fas fa-magic nav-icon',
    path: '/addwizard'
  }
];

const StyledBrandImage = styled(PfImage)`
  float: left;
  line-height: 0.8;
  margin: -1px 8px 0 6px;
  opacity: 0.8;
  --pf-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
    0 6px 6px rgba(0, 0, 0, 0.23) !important;
`;

const StyledUserImage = styled(PfImage)`
  --pf-box-shadow: 0 3px 6px #00000029, 0 3px 6px #0000003b !important;
`;

const MenuSidebar = () => {
  const sidebarSkin = useSelector((state: any) => state.ui.sidebarSkin);
  const menuItemFlat = useSelector((state: any) => state.ui.menuItemFlat);
  const menuChildIndent = useSelector((state: any) => state.ui.menuChildIndent);

  return (
    <aside className={`main-sidebar elevation-4 ${sidebarSkin}`}>
      <Link to="/" className="brand-link">
        <StyledBrandImage
          src="/img/logo.png"
          alt="AdminLTE Logo"
          width={33}
          height={33}
          rounded
        />
        <span className="brand-text font-weight-light">PYHSS-GUI</span>
      </Link>
      <div className="sidebar">
        <nav className="mt-2" style={{overflowY: 'hidden'}}>
          <ul
            className={`nav nav-pills nav-sidebar flex-column${
              menuItemFlat ? ' nav-flat' : ''
            }${menuChildIndent ? ' nav-child-indent' : ''}`}
            role="menu"
          >
            {MENU.map((menuItem: IMenuItem) => (
              <MenuItem
                key={menuItem.name + menuItem.path}
                menuItem={menuItem}
              />
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default MenuSidebar;
