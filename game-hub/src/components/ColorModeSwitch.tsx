//useColorMode is a custom hook defined in chakra
import { HStack, Switch, Text, useColorMode } from "@chakra-ui/react";

const ColorModeSwitch = () => {
  //colorMode reps the current mode
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <HStack>
      <Switch
        colorScheme="green"
        isChecked={colorMode === "dark"} // If colorMode is "dark," the switch will be in the "on" state (checked)
        onChange={toggleColorMode} //handles the change of the colorMode
      />
      <Text>Dark Mode</Text>
    </HStack>
  );
};

export default ColorModeSwitch;

//go to navbar and place ColorModeSwitch in HStack
