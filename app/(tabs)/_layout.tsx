import { DynamicColorIOS } from 'react-native';
import { NativeTabs, Icon } from 'expo-router/unstable-native-tabs';

export default function TabLayout() {
  return (
    <NativeTabs
      labelStyle={{
        color: DynamicColorIOS({ dark: 'white', light: 'black' }),
      }}
      tintColor={DynamicColorIOS({ dark: 'white', light: 'black' })}
    >
      {/* Main Tab */}
      <NativeTabs.Trigger name="main">
        <Icon sf={{ default: 'house', selected: 'house.fill' }} />
      </NativeTabs.Trigger>

      {/* Settings Tab */}
      <NativeTabs.Trigger name="settings">
        <Icon sf={{ default: 'gear', selected: 'gear.fill' }} />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
