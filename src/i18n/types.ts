/**
 * Copy type derived from the canonical English copy - zh.ts must
 * satisfy it exactly, so a missing translation is a compile error.
 */
import type { en } from './en';

export type Copy = typeof en;
export type Lang = 'en' | 'zh';
