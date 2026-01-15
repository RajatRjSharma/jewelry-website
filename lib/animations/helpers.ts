/**
 * Animation Helper Functions
 * 
 * Provides convenient access to animation presets from centralized constants.
 * These helpers abstract away direct constant access for better maintainability.
 */

import { SPRING_CONFIG, ANIMATION_PRESETS } from './constants';

/**
 * Get standard hover animation preset
 */
export function getHoverAnimation() {
  return ANIMATION_PRESETS.HOVER;
}

/**
 * Get standard tap animation preset
 */
export function getTapAnimation() {
  return ANIMATION_PRESETS.TAP;
}

/**
 * Get icon hover animation preset
 */
export function getIconHoverAnimation() {
  return ANIMATION_PRESETS.ICON_HOVER;
}

/**
 * Get icon tap animation preset
 */
export function getIconTapAnimation() {
  return ANIMATION_PRESETS.ICON_TAP;
}

/**
 * Get card hover animation preset
 */
export function getCardHoverAnimation() {
  return ANIMATION_PRESETS.CARD_HOVER;
}

/**
 * Get link hover animation preset
 */
export function getLinkHoverAnimation() {
  return ANIMATION_PRESETS.LINK_HOVER;
}

/**
 * Get menu item hover animation preset
 */
export function getMenuItemHoverAnimation() {
  return ANIMATION_PRESETS.MENU_ITEM_HOVER;
}

/**
 * Get standard spring config
 */
export function getSpringConfig() {
  return SPRING_CONFIG.STANDARD;
}
