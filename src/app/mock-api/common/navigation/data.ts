/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/dashboards'
    },

    {
        id: 'classes',
        title: 'Classes',
        type: 'basic',
        icon: 'heroicons_outline:chart-bar-square',
        link: '/classes'
    },
    {
        id: 'reports',
        title: 'Reports',
        type: 'collapsable',
        icon: 'heroicons_outline:document-chart-bar',
        children: [
            {
                id: 'list',
                title: 'Reports Management',
                type: 'basic',
                icon: 'heroicons_outline:queue-list',
                link: '/reports/list'
            },
            {
                id: 'files',
                title: 'Report Files',
                type: 'basic',
                icon: 'heroicons_outline:document-duplicate',
                link: '/reports/classes'
            },
        ],
    },
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/dashboards'
    },

    {
        id: 'classes',
        title: 'Classes',
        type: 'basic',
        icon: 'heroicons_outline:chart-bar-square',
        link: '/classes'
    },
    {
        id: 'reports',
        title: 'Reports',
        type: 'collapsable',
        icon: 'heroicons_outline:document-chart-bar',
        children: [
            {
                id: 'list',
                title: 'Reports Management',
                type: 'basic',
                icon: 'heroicons_outline:queue-list',
                link: '/reports/list'
            },
            {
                id: 'files',
                title: 'Report Files',
                type: 'basic',
                icon: 'heroicons_outline:document-duplicate',
                link: '/reports/classes'
            },
        ],
    },
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/dashboards'
    },

    {
        id: 'classes',
        title: 'Classes',
        type: 'basic',
        icon: 'heroicons_outline:chart-bar-square',
        link: '/classes'
    },
    {
        id: 'reports',
        title: 'Reports',
        type: 'collapsable',
        icon: 'heroicons_outline:document-chart-bar',
        children: [
            {
                id: 'list',
                title: 'Reports Management',
                type: 'basic',
                icon: 'heroicons_outline:queue-list',
                link: '/reports/list'
            },
            {
                id: 'files',
                title: 'Report Files',
                type: 'basic',
                icon: 'heroicons_outline:document-duplicate',
                link: '/reports/classes'
            },
        ],
    },
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/dashboards'
    },

    {
        id: 'classes',
        title: 'Classes',
        type: 'basic',
        icon: 'heroicons_outline:chart-bar-square',
        link: '/classes'
    },
    {
        id: 'reports',
        title: 'Reports',
        type: 'collapsable',
        icon: 'heroicons_outline:document-chart-bar',
        children: [
            {
                id: 'list',
                title: 'Reports Management',
                type: 'basic',
                icon: 'heroicons_outline:queue-list',
                link: '/reports/list'
            },
            {
                id: 'files',
                title: 'Report Files',
                type: 'basic',
                icon: 'heroicons_outline:document-duplicate',
                link: '/reports/classes'
            },
        ],
    },
];
