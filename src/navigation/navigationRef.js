// src/navigation/navigationRef.js
import { createNavigationContainerRef, CommonActions } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

/**
 * Force navigation to Detect tab/screen and pass the payload as params.
 * This always tries: App -> Detect -> DetectScreen (or Detect).
 * If 'App' parent not found it falls back to searching for a parent that contains Detect.
 */
export function navigateToDetect(payload = {}) {
  if (!navigationRef.isReady()) return;

  // Build route params: include the whole payload for stronger identity handling
  const params = typeof payload === 'string' ? { autofillText: JSON.parse(payload).text || '' } : { ...payload, autofillText: payload?.text ?? '' };

  // Preferred: if app stack named "App" exists, navigate App -> Detect
  try {
    navigationRef.navigate('App', { screen: 'Detect', params });
    return;
  } catch (e) {
    // continue
  }

  // Try to find a parent that contains a child named 'Detect' or 'DetectScreen'
  const state = navigationRef.getRootState?.();
  if (state) {
    function findParent(routes) {
      for (const r of routes) {
        const name = r.name;
        const childState = r.state;
        // Check tab children
        if (childState && childState.routes) {
          const found = childState.routes.find(cr => cr.name === 'Detect' || cr.name === 'DetectScreen');
          if (found) return { parent: name, child: found.name };
          const deeper = findParent(childState.routes);
          if (deeper) return deeper;
        }
      }
      return null;
    }

    const found = findParent(state.routes);
    if (found) {
      try {
        navigationRef.navigate(found.parent, { screen: found.child, params });
        return;
      } catch (err) {
        navigationRef.dispatch(
          CommonActions.navigate(found.parent, { screen: found.child, params })
        );
        return;
      }
    }
  }

  // Last-resort fallbacks
  try {
    navigationRef.navigate('Detect', params);
  } catch (e) {
    try {
      navigationRef.navigate('DetectScreen', params);
    } catch (err) {
      // give up silently
    }
  }
}
