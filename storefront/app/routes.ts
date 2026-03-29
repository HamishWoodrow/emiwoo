import {flatRoutes} from '@react-router/fs-routes';
import {type RouteConfig} from '@react-router/dev/routes';

// Phase 1: File-system routing only.
// Phase 2: Wrap with hydrogenRoutes() for cart, account, collections, etc.
export default flatRoutes() satisfies Promise<RouteConfig>;
