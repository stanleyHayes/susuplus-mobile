import React, { useState } from "react";
import { Box, Button, Divider, Input, ScrollView, Text } from "native-base";
import { selectGroups } from "../redux/groups/group-reducers";
import { useDispatch, useSelector } from "react-redux";
import SingleRegulationListItem from "./single-regulation-list-item";
import { GROUP_ACTION_CREATORS } from "../redux/groups/group-action-creators";
import Empty from "./empty";

const GroupRegulationsForm = () => {
    
    const { createGroupRegulations } = useSelector(selectGroups);
    
    const [regulation, setRegulation] = useState("");
    const [error, setError] = useState({});
    
    const [regulations, setRegulations] = useState([...createGroupRegulations]);
    
    const addRegulation = () => {
        if (!regulation) {
            setError({ error, regulation: "Field Required" });
            return;
        } else {
            setError({ error, regulation: null });
        }
        setRegulations([...regulations, regulation]);
        setRegulation("");
    };
    
    const removeRegulation = i => {
        setRegulations(regulations.filter((regulation, index) => i !== index));
    };
    
    const dispatch = useDispatch();
    
    const handleGroupRegulationsSubmit = () => {
        if (regulations.length <= 0) {
            setError({ error, regulations: "Add at least one policy" });
            return;
        } else {
            setError({ error, regulations: null });
        }
        dispatch(GROUP_ACTION_CREATORS.saveGroupRegulations(regulations));
        dispatch(GROUP_ACTION_CREATORS.groupGoToNextPage());
    };
    
    return (
        <ScrollView flex={1} minHeight="100%">
            <Box
                borderBottomLeftRadius={0}
                 borderTopRightRadius={0}
                 borderBottomRightRadius={16}
                 borderTopLeftRadius={16}
                 p={5}
                 shadow={0}
                 backgroundColor="white" m={2}>
                <Text fontSize="sm" color="muted.400">Group Regulations</Text>
                
                <Divider width="100%" my={2} />
                
                <Box mb={2}>
                    <Input
                        placeholder="Type regulation"
                        variant="outline"
                        borderBottomLeftRadius={0}
                        borderTopRightRadius={0}
                        borderBottomRightRadius={16}
                        borderTopLeftRadius={16}
                        py={3}
                        isInvalid={Boolean(error.regulation)}
                        _focus={{ borderColor: "gray.400" }}
                        _invalid={{ borderColor: "red.400", borderWidth: 1, borderStyle: "solid" }}
                        isFullWidth={true}
                        mb={1}
                        multiline={true}
                        value={regulation}
                        name="regulation"
                        onChangeText={regulation => setRegulation(regulation)}
                        isRequired={true}
                    />
                    {error.regulation && <Text color="error.400">{error.regulation}</Text>}
                    
                    <Button
                        mt={2}
                        backgroundColor="primary.600"
                        py={3}
                        _text={{color: 'white', fontSize: 'xs'}}
                        borderBottomLeftRadius={0}
                        borderTopRightRadius={0}
                        borderBottomRightRadius={16}
                        borderTopLeftRadius={16}
                        onPress={addRegulation}>
                        Add
                    </Button>
                </Box>
            </Box>
            
            <Box
                borderBottomLeftRadius={0}
                borderTopRightRadius={0}
                borderBottomRightRadius={16}
                borderTopLeftRadius={16}
                p={4}
                shadow={0}
                backgroundColor="white"
                m={2}>
                <Text fontSize="sm" color="muted.400">Group Regulations ({regulations.length})</Text>
                
                <Divider width="100%" my={2} />
                
                <Box>
                    {
                        regulations && regulations.length === 0 ? (
                            <Box>
                                <Empty description="No regulations yet" title="Group Regulations" />
                            </Box>
                        ) : (
                            regulations.map((regulation, index) => {
                                return (
                                    <SingleRegulationListItem
                                        key={index}
                                        regulation={regulation}
                                        index={index}
                                        showDelete={true}
                                        removeRegulation={removeRegulation}
                                    />
                                );
                            })
                        )
                    }
                </Box>
            </Box>
            
            <Box p={5} mt={2} flexDirection="row">
                <Button
                    mr={1}
                    flexGrow={1}
                    backgroundColor="white"
                    borderBottomLeftRadius={0}
                    borderTopRightRadius={0}
                    borderBottomRightRadius={16}
                    borderTopLeftRadius={16}
                    py={3}
                    borderColor="primary.600"
                    borderWidth={1}
                    _text={{color: 'primary.600', fontSize: 'xs'}}
                    onPress={() => dispatch(GROUP_ACTION_CREATORS.groupGoToPreviousPage())}
                    variant="solid">
                    Previous
                </Button>
    
                {regulations.length > 0 && (
                    <Button
                        flexGrow={1}
                        ml={1}
                        backgroundColor="primary.600"
                        borderBottomLeftRadius={0}
                        borderTopRightRadius={0}
                        borderBottomRightRadius={16}
                        borderTopLeftRadius={16}
                        py={3}
                        _text={{color: 'white', fontSize: 'xs'}}
                        onPress={handleGroupRegulationsSubmit}
                        variant="solid">
                        Next
                    </Button>
                )}
            </Box>
        </ScrollView>
    );
};

export default GroupRegulationsForm;
