/** 全站统一的缓动曲线（easeOutQuint 近似），所有 motion 过渡都用它。 */
export const ease = [0.22, 1, 0.36, 1] as const;

export const spring = { type: "spring", stiffness: 420, damping: 34 } as const;
