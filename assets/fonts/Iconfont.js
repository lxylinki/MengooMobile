/**
 * Iconfont icon set component.
 * Usage: <Iconfont name="icon-name" size={20} color="#4F8EF7" />
 */

import createIconSet from './lib/create-icon-set';
import glyphMap from './glyphmaps/Iconfont.json';

const iconSet = createIconSet(glyphMap, 'Iconfont', 'Iconfont.ttf');

export default iconSet;
