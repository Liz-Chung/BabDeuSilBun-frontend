import { http, HttpResponse } from 'msw';
import { TEAM_ORDER_LIST_API_URL } from '@/services/teamOrderService';
import { RESTAURANT_LIST_API_URL } from '@/services/restaurantService';
import { MENU_LIST_API_URL } from '@/services/menuService';
import { applyFiltersAndSorting } from './filteringAndSorting';
import { paginatedStores, stores } from './mockData/restaurants';
import { paginatedMeetings } from './mockData/meetings';
import { paginatedMenus, menus } from './mockData/menus';

export const handler = [
  // Handler for restaurant list
  http.get(RESTAURANT_LIST_API_URL, (req) => {
    const { request } = req;
    const urlString = request.url.toString();

    try {
      const url = new URL(urlString);
      const searchMenu = url.searchParams.get('searchMenu');
      // const schoolId = url.searchParams.get('schoolId');
      const sortCriteria = url.searchParams.get('sortCriteria');
      const pageParam = Number(url.searchParams.get('page')) || 0;
      const size = Number(url.searchParams.get('size'));
      const foodCategoryFilter = url.searchParams.get('foodCategoryFilter');

      const paginatedResponse = paginatedStores[pageParam];

      if (!paginatedResponse) {
        return HttpResponse.json({ message: 'Page not found' });
      }

      const filteredContent = applyFiltersAndSorting(
        paginatedResponse.content,
        { foodCategoryFilter, searchMenu, size },
        sortCriteria,
      );

      return HttpResponse.json({
        ...paginatedResponse,
        content: filteredContent,
      });
    } catch (error) {
      console.error('Error parsing URL:', error);
      return HttpResponse.status(500).json({ message: 'Error parsing URL' });
    }
  }),

  // Handler for getting store details by storeId
  http.get('/api/stores/:storeId', (req) => {
    const storeId = Number(req.params.storeId);
    const store = stores.find((s) => s.storeId === storeId);
    if (store) {
      return HttpResponse.json(store);
    }
    return HttpResponse.status(404).json({ message: 'Store not found' });
  }),

  // Handler for team order list
  http.get(TEAM_ORDER_LIST_API_URL, (req) => {
    const { request } = req;
    const urlString = request.url.toString();

    try {
      const url = new URL(urlString);
      const searchMenu = url.searchParams.get('searchMenu');
      // const schoolId = url.searchParams.get('schoolId');
      const sortCriteria = url.searchParams.get('sortCriteria');
      const pageParam = Number(url.searchParams.get('page')) || 0;
      const size = Number(url.searchParams.get('size'));
      const foodCategoryFilter = url.searchParams.get('foodCategoryFilter');

      const paginatedResponse = paginatedMeetings[pageParam];

      if (!paginatedResponse) {
        return HttpResponse.json({ message: 'Page not found' });
      }

      const filteredContent = applyFiltersAndSorting(
        paginatedResponse.content,
        { foodCategoryFilter, searchMenu, size },
        sortCriteria,
      );

      return HttpResponse.json({
        ...paginatedResponse,
        content: filteredContent,
      });
    } catch (error) {
      console.error('Error parsing URL:', error);
      return HttpResponse.status(500).json({ message: 'Error parsing URL' });
    }
  }),

  // Handler for fetching meeting headcount
  http.get('/api/users/meetings/:meetingId/headcount', () => {
    // const meetingId = Number(req.params.meetingId);
    const headcount = {
      currentHeadCount: 5,
    };
    return HttpResponse.json(headcount);
  }),

  // Handler for menu list
  http.get('/api/stores/:storeId/menus', (req) => {
    const { request } = req;
    const storeId = Number(req.params.storeId);
    const urlString = request.url.toString();

    try {
      const url = new URL(urlString);
      // const schoolId = url.searchParams.get('schoolId');
      const pageParam = Number(url.searchParams.get('page')) || 0;
      const size = Number(url.searchParams.get('size'));

      const paginatedResponse = paginatedMenus[storeId]?.[pageParam];

      if (!paginatedResponse) {
        return HttpResponse.json({ message: 'Page not found' });
      }

      return HttpResponse.json({
        ...paginatedResponse,
      });
    } catch (error) {
      console.error('Error parsing URL:', error);
      return HttpResponse.status(500).json({ message: 'Error parsing URL' });
    }
  }),
  // Handler for getting menu details by storeId and menuId
  http.get('/api/stores/:storeId/menus/:menuId', (req) => {
    const storeId = Number(req.params.storeId);
    const menuId = Number(req.params.menuId);

    const storeMenus = menus.filter((menu) => menu.storeId === storeId);
    const menu = storeMenus.find((m) => m.menuId === menuId);

    if (menu) {
      return HttpResponse.json(menu);
    }

    return HttpResponse.status(404).json({ message: 'Menu not found' });
  }),
];