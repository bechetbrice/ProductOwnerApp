/**
 * Configuration Babel pour Jest
 * 
 * Permet de transformer le JSX et les modules ES6
 */

export default {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
};
