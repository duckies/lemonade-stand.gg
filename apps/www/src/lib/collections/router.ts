import { notFound } from "next/navigation";
import { join } from "node:path";
import { cache } from "react";
import {
  getRouteContent,
  getRoutes,
  type RouteWithContent,
} from "~/lib/collections/content";

function createRouter() {
  const _routes = cache(() => getRoutes())();

  const findOne = async (...path: string[]) => {
    const routes = await _routes;
    const route = routes.get(join(...path));

    if (!route) {
      notFound();
    }

    return getRouteContent(route);
  };

  const findAll = async (
    ...path: string[]
  ): Promise<RouteWithContent[]> => {
    const routes = [...(await _routes)];
    const filtered = routes.filter(([route]) =>
      route.startsWith(join(...path))
    );

    return Promise.all(filtered.map(async ([route, file]) => {
      const content = await getRouteContent(file);

      return {
        url: route,
        file,
        content,
      };
    }));
  };

  return {
    findOne,
    findAll,
  };
}

export const router = createRouter();
