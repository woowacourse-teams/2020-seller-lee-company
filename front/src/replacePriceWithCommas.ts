/**
 * @author joseph415
 */

export default function replacePriceWithCommas(price: string) {
  return price.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
