export function removeVietnameseTones(str: string) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase();
}

export const createPaging = (
  totalPage: number,
  currentPage: number
): number[] => {
  if (totalPage <= 10) {
    return Array.from({ length: totalPage }, (_, i) => i + 1);
  }

  if (currentPage == 4 && currentPage < totalPage - 4) {
    const first = [1, 2, 3];
    const mid = [currentPage, currentPage + 1, currentPage + 2];
    const last = [totalPage - 3, totalPage - 2, totalPage - 1, totalPage];

    return [...first, ...mid, 0, ...last];
  }

  if (currentPage == 5 && currentPage < totalPage - 4) {
    if (currentPage + 2 === totalPage - 4) {
      const first = [1, 2, 3];
      const mid = [
        currentPage - 1,
        currentPage,
        currentPage + 1,
        currentPage + 2,
      ];
      const last = [totalPage - 3, totalPage - 2, totalPage - 1, totalPage];

      return [...first, ...mid, ...last];
    } else {
      const first = [1, 2, 3];
      const mid = [
        currentPage - 1,
        currentPage,
        currentPage + 1,
        currentPage + 2,
      ];
      const last = [totalPage - 3, totalPage - 2, totalPage - 1, totalPage];

      return [...first, ...mid, 0, ...last];
    }
  }

  if (currentPage === 6 && currentPage < totalPage - 5) {
    if (currentPage + 1 === totalPage - 5) {
      const first = [1, 2, 3];
      const mid = [
        currentPage - 2,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        currentPage + 2,
      ];
      const last = [totalPage - 3, totalPage - 2, totalPage - 1, totalPage];

      return [...first, ...mid, ...last];
    } else {
      const first = [1, 2, 3];
      const mid = [
        currentPage - 2,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        currentPage + 2,
      ];
      const last = [totalPage - 3, totalPage - 2, totalPage - 1, totalPage];

      return [...first, ...mid, 0, ...last];
    }
  }

  if (currentPage > 6 && currentPage < totalPage - 6) {
    const first = [1, 2, 3];
    const mid = [
      currentPage - 2,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      currentPage + 2,
    ];
    const last = [totalPage - 3, totalPage - 2, totalPage - 1, totalPage];

    return [...first, 0, ...mid, 0, ...last];
  }

  if (currentPage === totalPage - 6 && currentPage > 5) {
    const first = [1, 2, 3];
    const mid = [
      currentPage - 2,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      currentPage + 2,
    ];
    const last = [totalPage - 3, totalPage - 2, totalPage - 1, totalPage];

    return [...first, 0, ...mid, ...last];
  }

  if (currentPage === totalPage - 5 && currentPage > 4) {
    if (totalPage - 5 - 2 === 4) {
      const first = [1, 2, 3];
      const mid = [
        currentPage - 2,
        currentPage - 1,
        currentPage,
        currentPage + 1,
      ];
      const last = [totalPage - 3, totalPage - 2, totalPage - 1, totalPage];

      return [...first, ...mid, ...last];
    } else {
      const first = [1, 2, 3];
      const mid = [
        currentPage - 2,
        currentPage - 1,
        currentPage,
        currentPage + 1,
      ];
      const last = [totalPage - 3, totalPage - 2, totalPage - 1, totalPage];

      return [...first, 0, ...mid, ...last];
    }
  }

  if (currentPage === totalPage - 4 && currentPage > 5) {
    const first = [1, 2, 3];
    const mid = [
      currentPage - 2,
      currentPage - 1,
      currentPage,
      currentPage + 1,
    ];
    const last = [totalPage - 2, totalPage - 1, totalPage];

    return [...first, 0, ...mid, ...last];
  }

  if (currentPage == totalPage - 3 && currentPage > 5) {
    const first = [1, 2, 3];
    const mid = [currentPage - 2, currentPage - 1, currentPage];
    const last = [totalPage - 2, totalPage - 1, totalPage];

    return [...first, 0, ...mid, ...last];
  }

  const first = [1, 2, 3, 4, 5];
  const last = [
    totalPage - 4,
    totalPage - 3,
    totalPage - 2,
    totalPage - 1,
    totalPage,
  ];

  return [...first, 0, ...last];
};
