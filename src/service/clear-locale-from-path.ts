const clearLocaleFromPath = (path: string, locale: string) => {
  if (path.startsWith(`/${locale}/`) || path === `/${locale}`) {
    return path.replace(`/${locale}`, '');
  }

  return path;
};

export default clearLocaleFromPath;
