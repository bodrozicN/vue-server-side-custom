export const generateStaticParams = async () => {
  const userIds = await new Promise((resolve) => resolve([1, 2, 3, 4]))

  return userIds
}
