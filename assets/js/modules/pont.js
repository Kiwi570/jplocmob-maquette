/* Pont entre les modules de la bibliothèque et le socle du site : les modules demandent pret() à leur propre socle ;
   ici, ils reçoivent le GSAP du site et le recalcul regroupé du socle. Pas de mode calme, pas de Lenis. */
import { rafraichir } from '../socle/index.js?v=2';

export async function pret() {
  return { gsap: window.gsap, ScrollTrigger: window.ScrollTrigger, calme: false, lenis: null, rafraichir };
}
