import React from "react";
import { Box, ScrollView, Text, Icon, Flex } from "native-base";
import Stat from "../../components/stat";
import { useSelector } from "react-redux";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { selectDashboard } from "../../redux/dashboard/dashboard-reducer";

const DashboardScreen = () => {
  const { dashboard } = useSelector(selectDashboard);
  return (
    <ScrollView flex={1} backgroundColor="gray.100">
      <Box shadow={1} p={3} m={2} backgroundColor="white" borderRadius={32}>
        <Text fontSize="2xl">Good Morning Stanley</Text>
        <Text fontSize="lg">How are you doing?</Text>
      </Box>
      <Flex width="100%" height="100%" flex={1} flexDirection="row" flexWrap="wrap">
        <Box flexGrow={1}>
          <Stat
            value={dashboard.disbursements.value}
            label={dashboard.disbursements.label}
            icon={<Icon name="attach-money" size="sm" as={MaterialIcons} />}
          />
        </Box>

        <Box flexGrow={1}>
          <Stat
            value={dashboard.contributions.value}
            label={dashboard.contributions.label}
            icon={<Icon name="attach-money" size="sm" as={MaterialIcons} />}
          />
        </Box>


      </Flex>
      <Flex width="100%" height="100%" flex={1} flexDirection="row" flexWrap="wrap">

        <Box flexGrow={1}>
          <Stat
            value={dashboard.groups.value}
            label={dashboard.groups.label}
            icon={<Icon name="group" size="sm" as={MaterialIcons} />}
          />
        </Box>

        <Box flexGrow={1}>
          <Stat
            value={dashboard.susu.value}
            label={dashboard.susu.label}
            icon={<Icon name="attach-money" size="sm" as={MaterialIcons} />}
          />
        </Box>

      </Flex>
      <Flex width="100%" height="100%" flex={1} flexDirection="row" flexWrap="wrap">

        <Box flexGrow={1}>
          <Stat
            value={`${dashboard.totalContributions.amount.value} ${dashboard.totalContributions.amount.currency}`}
            label={dashboard.totalContributions.label}
            icon={<Icon name="group" size="sm" as={MaterialIcons} />}
          />
        </Box>

        <Box flexGrow={1}>
          <Stat
            value={`${dashboard.totalDisbursements.amount.value} ${dashboard.totalDisbursements.amount.currency}`}
            label={dashboard.totalContributions.label}
            icon={<Icon name="attach-money" size="sm" as={MaterialIcons} />}
          />
        </Box>
      </Flex>
    </ScrollView>
  );
};

export default DashboardScreen;
