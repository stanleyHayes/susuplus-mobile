import React, { useEffect } from "react";
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  HStack,
  Icon,
  Image,
  Pressable,
  ScrollView,
  Spinner,
  Text,
} from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { selectSusu } from "../../redux/susu/susu-reducer";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import moment from "moment";
import { SCREEN_NAME_CONSTANTS } from "../../constants/constants";
import { SUSU_ACTION_CREATORS } from "../../redux/susu/susu-action-creators";
import { selectAuth } from "../../redux/auth/auth-reducer";
import defaultGroupImage from "./../../assets/images/group-colored.png";
import defaultUserImage from "./../../assets/images/user.png";
import paymentOrderIcon from "./../../assets/images/clipboard.png";
import disbursementOrderIcon from "./../../assets/images/expenses.png";
import contributionIcon from "./../../assets/images/donation.png";
import susuMembersIcon from "./../../assets/images/team.png";
import { SUSU_MEMBERS_ACTION_CREATORS } from "../../redux/susu-members/susu-members-action-creators";
import { selectSusuGroupMembers } from "../../redux/susu-members/susu-members-reducers";
import SingleRegulationListItem from "../../components/single-regulation-list-item";
import NavigationBar from "react-native-navbar-color";

const SusuDetailScreen = ({ navigation, route }) => {
  const { susuDetail, susuLoading, susuError } = useSelector(selectSusu);
  const { susuMembers } = useSelector(selectSusuGroupMembers);

  const { authToken } = useSelector(selectAuth);

  const dispatch = useDispatch();

  const { susuID } = route.params;

  useEffect(() => {
    dispatch(SUSU_ACTION_CREATORS.getSusuGroup(authToken, susuID));
  }, []);

  useEffect(() => {
    dispatch(SUSU_MEMBERS_ACTION_CREATORS.getSusuGroupMembers(authToken, susuID));
  }, []);
  
  useEffect(() => {
    NavigationBar.setColor('#155e75');
  }, []);
  
  return (

    <ScrollView minHeight="100%" backgroundColor="gray.100">
      <Flex position="relative" flex={1} height="100%" width="100%" backgroundColor="gray.100">
        {susuLoading &&
        (<Center position="absolute" height="100%" width="100%">
          <Spinner
            position="absolute"
            size="lg"
            color="primary.800"
            zIndex={10000}
          />
        </Center>)
        }
        
        {susuDetail && (
          <Box>
            <Box
              borderRadius={32}
              backgroundColor="white"
              p={4}
              m={2}
              shadow={0}>
              <Text>Group</Text>
              <Divider
                alignSelf="center"
                width="100%"
                mt={1}
                mb={1}
                backgroundColor="muted.200"
                orientation="horizontal"
                thickness={1} />
              <HStack>
                <Box
                  backgroundColor="primary.100"
                  borderRadius={100}
                  size={60}>
                  <Image
                    alt={susuDetail.group.name}
                    source={susuDetail.group.image ? susuDetail.group.image : defaultGroupImage}
                    objectPosition="center"
                    resizeMode="cover"
                    borderRadius={100}
                    size={60}
                  />
                </Box>
                <Box ml={2}>
                  <Text
                    fontSize="xl">{susuDetail.group && susuDetail.group && susuDetail.group.name}
                  </Text>
                  <Text mb={2}>
                    {susuMembers &&  susuMembers.length } {susuMembers &&  susuMembers.length === 1 ? "susu member" : "susu members"}
                  </Text>
                </Box>
              </HStack>
              <Divider
                alignSelf="center"
                width="100%"
                mt={1}
                mb={1}
                backgroundColor="muted.200"
                orientation="horizontal"
                thickness={1} />
              <Text>{susuDetail && susuDetail.group && susuDetail.group.description}</Text>
            </Box>

            <Box p={4}>
              <Button
                onPress={() => {
                  navigation.push(SCREEN_NAME_CONSTANTS.MAKE_CONTRIBUTION_SCREEN, { susuDetail });
                }}
                variant="outlined"
                my={1}
                isDisabled={susuDetail.status !== 'STARTED'}
                _disabled={{backgroundColor: 'secondary.400'}}
                backgroundColor="secondary.600"
                size="lg"
                py={4}
                borderRadius={32}>
                <Text fontSize="md" color={susuDetail.status === 'STARTED' ? 'white': 'black'}>Contribute</Text>
              </Button>
            </Box>

            {susuDetail && susuDetail.currentRecipient && (
              <Box
                borderRadius={32}
                backgroundColor="white"
                p={4}
                m={2}
                shadow={0}>
                <Text>Current Recipient</Text>
                <Divider
                  alignSelf="center"
                  width="100%"
                  mt={1}
                  mb={1}
                  backgroundColor="muted.200"
                  orientation="horizontal"
                  thickness={1} />
                <HStack>
                  <Box>
                    <Image
                      alt={susuDetail.currentRecipient.member.user.name}
                      source={susuDetail.currentRecipient.member.image ? susuDetail.currentRecipient.member.image : defaultUserImage}
                      objectPosition="center"
                      resizeMode="cover"
                      borderRadius={100}
                      size={50} />
                  </Box>
                  <Box ml={2}>
                    <Text
                      mb={1}
                      fontSize="xl"
                      noOfLines={4}>{susuDetail.currentRecipient.member.user.name}</Text>
                    <Text>Disbursed {moment(susuDetail.currentRecipient.date).fromNow()}</Text>
                  </Box>
                </HStack>
              </Box>
            )}

            {susuDetail && susuDetail.nextRecipient && (
              <Box
                borderRadius={32}
                backgroundColor="white"
                p={4}
                m={2}
                shadow={0}>
                <Text>Next Recipient</Text>
                <Divider
                  alignSelf="center"
                  width="100%"
                  mt={1}
                  mb={1}
                  backgroundColor="muted.200"
                  orientation="horizontal"
                  thickness={1} />
                <HStack>
                  <Box>
                    <Image
                      alt={susuDetail.nextRecipient.member.user.name}
                      source={susuDetail.nextRecipient.member.user.image ? susuDetail.nextRecipient.user.member.image : defaultUserImage}
                      objectPosition="center"
                      resizeMode="cover"
                      borderRadius={100}
                      size={50} />
                  </Box>
                  <Box ml={2}>
                    <Text
                      mb={1}
                      fontSize="xl"
                      noOfLines={4}>{susuDetail.nextRecipient.member.user.name}</Text>
                    <Text>{moment(susuDetail.nextRecipient.date).format("Do MMM, YYYY")}</Text>
                  </Box>
                </HStack>
              </Box>
            )}


            {susuDetail && susuDetail.previousRecipient && (
              <Box
                borderRadius={32}
                backgroundColor="white"
                p={4}
                m={2}
                shadow={0}>
                <Text>Previous Recipient</Text>
                <Divider
                  alignSelf="center"
                  width="100%"
                  mt={1}
                  mb={1}
                  backgroundColor="muted.200"
                  orientation="horizontal"
                  thickness={1} />
                <HStack>
                  <Box>
                    <Image
                      alt={susuDetail.previousRecipient.member.user.name}
                      source={susuDetail.previousRecipient.member.user.image ? susuDetail.previousRecipient.member.user.image : defaultUserImage}
                      objectPosition="center"
                      resizeMode="cover"
                      borderRadius={100}
                      size={50} />
                  </Box>
                  <Box ml={2}>
                    <Text
                      mb={1}
                      fontSize="xl"
                      noOfLines={4}>{susuDetail.previousRecipient.member.user.name}</Text>
                    <Text>{moment(susuDetail.previousRecipient.date).format("Do MMM, YYYY")}</Text>
                  </Box>
                </HStack>
              </Box>
            )}

            <Box
              borderRadius={32}
              backgroundColor="white"
              p={4}
              m={2}
              shadow={0}>
              <Text>Payment Plan</Text>
              <Divider
                alignSelf="center"
                width="100%"
                mt={1}
                mb={1}
                backgroundColor="muted.200"
                orientation="horizontal"
                thickness={1} />
              <Text
                fontSize="lg">{`${parseFloat(susuDetail.paymentPlan.amount).toFixed(2)} ${susuDetail.paymentPlan.currency}`}</Text>
            </Box>

            <Box
              borderRadius={32}
              backgroundColor="white"
              p={4}
              m={2}
              shadow={0}>
              <Text>Contribution Plan</Text>
              <Divider
                alignSelf="center"
                width="100%"
                mt={1}
                mb={1}
                backgroundColor="muted.200"
                orientation="horizontal"
                thickness={1} />
              <Text
                fontFamily="body"
                fontSize="lg">
                {`${susuDetail.contributionPlan.interval} ${susuDetail.contributionPlan.unit}`}
              </Text>
            </Box>
  
            <Box mb={2} shadow={0} borderRadius={32} backgroundColor="white" p={4}>
              <Text fontFamily="body" fontSize="md">
                Group Regulations
              </Text>
              <Divider
                  alignSelf="center"
                  width="100%"
                  mt={1}
                  mb={1}
                  backgroundColor="muted.200"
                  orientation="horizontal"
                  thickness={1} />
              {
                susuDetail.regulations.map((regulation, index) => {
                  return (
                      <SingleRegulationListItem
                          key={index}
                          regulation={regulation}
                          index={index}
                          showDelete={false}
                      />
                  );
                })
              }
            </Box>
            
            <Box
              borderRadius={32}
              backgroundColor="white"
              p={4}
              m={2}
              shadow={0}>
              <Text>Creator</Text>
              <Divider
                alignSelf="center"
                width="100%"
                mt={1}
                mb={1}
                backgroundColor="muted.200"
                orientation="horizontal"
                thickness={1} />
              <HStack>
                <Box>
                  <Image
                    alt={susuDetail.creator.user.name}
                    source={susuDetail.creator.user.image ? susuDetail.creator.user.image : defaultUserImage}
                    objectPosition="center"
                    resizeMode="cover"
                    borderRadius={100}
                    size={50} />
                </Box>
                <Box ml={2}>
                  <Text
                    fontSize="lg">
                    {susuDetail.creator.user.name}
                  </Text>
                  <Text fontSize="sm" fontFamily="body">{susuDetail.creator.role}</Text>
                </Box>
              </HStack>
            </Box>

            <Box
              mt={2}
              mb={2}
              borderRadius={32}
              backgroundColor="white"
              p={4}
              m={2}
              shadow={0}>
              <Text mt={1} mb={1}>Start Date</Text>
              <Text mt={1} mb={1} fontSize="md" fontFamily="body">
                {moment(susuDetail.startDate).format("Do MMM, YYYY")}
              </Text>
              <Divider
                  mt={1} mb={1}
                  alignSelf="center"
                  width="100%"
                  backgroundColor="muted.200"
                  orientation="horizontal"
                  thickness={1} />
              <Text>End Date</Text>
              <Text mt={1} mb={1} fontSize="md" fontFamily="body">
                {moment(susuDetail.endDate).format("Do MMM, YYYY")}
              </Text>
              <Divider
                  alignSelf="center"
                  width="100%"
                  mt={1}
                  mb={1}
                  backgroundColor="muted.200"
                  orientation="horizontal"
                  thickness={1} />
              <Text mt={1} mb={1}>Status</Text>
              <Text fontSize="md" fontFamily="body">
                {susuDetail.status}
              </Text>
            </Box>

            <Pressable
              onPress={() => navigation.push(SCREEN_NAME_CONSTANTS.SUSU_PAYMENT_ORDER_SCREEN, { paymentOrder: susuDetail.paymentOrder })}>
              <Box mt={2} mb={2} m={2} shadow={0} borderRadius={32} p={2} backgroundColor="primary.50">
                <HStack>
                  <Center
                    backgroundColor="primary.100"
                    borderRadius={100}
                    size={50}>
                    <Image
                      alt="Payment Order Icon"
                      source={paymentOrderIcon}
                      objectPosition="center"
                      resizeMode="cover"
                      borderRadius={100}
                      size={30}
                    />
                  </Center>
                  <Flex flex={1} ml={2} justifyContent="center">
                    <Text fontSize="md">Payment Order</Text>
                    <Text fontSize="xs">View Susu Payment Order</Text>
                  </Flex>
                  <Flex justifyContent="center">
                    <Icon size="md" as={MaterialIcons} color="primary.600" name="chevron-right" />
                  </Flex>
                </HStack>
              </Box>
            </Pressable>

            <Pressable
              onPress={() => navigation.push(SCREEN_NAME_CONSTANTS.SUSU_MEMBERS_SCREEN, { susuID: susuDetail._id })}>
              <Box mt={2} mb={2} m={2} shadow={0} borderRadius={32} p={2} backgroundColor="primary.50">
                <HStack>
                  <Center
                    backgroundColor="primary.100"
                    borderRadius={100}
                    size={50}>
                    <Image
                      alt="Susu members Icon"
                      source={susuMembersIcon}
                      objectPosition="center"
                      resizeMode="cover"
                      borderRadius={100}
                      size={30}
                    />
                  </Center>
                  <Flex flex={1} ml={2} justifyContent="center">
                    <Text fontSize="md">Susu Members</Text>
                    <Text fontSize="xs">View Susu Members</Text>
                  </Flex>
                  <Flex justifyContent="center">
                    <Icon size="md" as={MaterialIcons} color="primary.600" name="chevron-right" />
                  </Flex>
                </HStack>
              </Box>
            </Pressable>

            <Pressable
              onPress={() => navigation.push(SCREEN_NAME_CONSTANTS.SUSU_DISBURSEMENTS_SCREEN, { susuID: susuDetail._id })}>
              <Box mt={2} mb={2} m={2} shadow={0} borderRadius={32} p={2} backgroundColor="primary.50">
                <HStack>
                  <Center
                    backgroundColor="primary.100"
                    borderRadius={100}
                    size={50}>
                    <Image
                      alt="Disbursement Icon"
                      source={disbursementOrderIcon}
                      objectPosition="center"
                      resizeMode="cover"
                      borderRadius={100}
                      size={30}
                    />
                  </Center>
                  <Flex flex={1} ml={2} justifyContent="center">
                    <Text fontSize="md">Disbursements</Text>
                    <Text fontSize="xs">View Disbursement History</Text>
                  </Flex>
                  <Flex justifyContent="center">
                    <Icon size="md" as={MaterialIcons} color="primary.600" name="chevron-right" />
                  </Flex>
                </HStack>
              </Box>
            </Pressable>

            <Pressable
              onPress={() => navigation.push(SCREEN_NAME_CONSTANTS.SUSU_CONTRIBUTIONS_SCREEN, { susuID: susuDetail._id })}>
              <Box mt={2} mb={2} m={2} shadow={0} borderRadius={32} p={2} backgroundColor="primary.50">
                <HStack>
                  <Center
                    backgroundColor="primary.100"
                    borderRadius={100}
                    size={50}>
                    <Image
                      alt="Contribution Icon"
                      source={contributionIcon}
                      objectPosition="center"
                      resizeMode="cover"
                      borderRadius={100}
                      size={30}
                    />
                  </Center>
                  <Flex flex={1} ml={2} justifyContent="center">
                    <Text fontSize="md">Contributions</Text>
                    <Text fontSize="xs">View Contributions History</Text>
                  </Flex>
                  <Flex justifyContent="center">
                    <Icon size="md" as={MaterialIcons} color="primary.600" name="chevron-right" />
                  </Flex>
                </HStack>
              </Box>
            </Pressable>
          </Box>
        )}
      </Flex>
    </ScrollView>
  );
};

export default SusuDetailScreen;
