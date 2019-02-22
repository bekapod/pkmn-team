export const lineHeight = (size: string = "base"): number => {
  switch (size) {
    case "xs":
      return 2.3571;
    case "sm":
      return 2.0625;
    case "md":
      return 1.5;
    case "lg":
      return 1.0313;
    case "xl":
      return 1.375;
    case "xxl":
      return 1.0313;
    default:
      return 1.8333;
  }
};
