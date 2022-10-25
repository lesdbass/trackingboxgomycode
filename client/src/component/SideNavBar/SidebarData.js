import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Setup',
    path: '/setup',
    icon: <AiIcons.AiFillControl />,
    //icon: <AiIcons.AiFillHome />
    cName: 'nav-text',
    expediteur: false ,
    livreur:false,
    admin : true

  },
  {
    title: 'Governorat',
    path: '/governorat',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text',
    expediteur: false ,
    livreur:false,
    admin : true
  },
  {
    title: 'Expediteur',
    path: '/expediteur',
    icon: <FaIcons.FaCartPlus />,
    cName: 'nav-text',
    expediteur: false ,
    livreur:false,
    admin : true
  },
  {
    title: 'Livreur',
    path: '/livreur',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text',
    expediteur: false ,
    livreur:false,
    admin : true
  },
  {
    title: 'Colis',
    path: '/colis',
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: 'nav-text',
    expediteur: true ,
    livreur:false,
    admin : true
  },
  {
    title: 'Historique Colis',
    path: '/histcolis',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text',
    expediteur: false ,
    livreur:true,
    admin : true
  },
  {
    title: 'runsheet',
    path: '/runsheet',
    icon: <IoIcons.IoIosAlarm />,
    cName: 'nav-text',
    expediteur: false ,
    livreur:true,
    admin : true

  }
  ,
  {
    title: 'Soldee',
    path: '/soldee',
    icon: <IoIcons.IoIosAlarm />,
    cName: 'nav-text',
    expediteur: false ,
    livreur:false,
    admin : true
  }
];
