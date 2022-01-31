import React, { useState } from "react";
import { Box, Button, Divider, Input, ScrollView, Text } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import SingleRegulationListItem from "./single-regulation-list-item";
import { GROUP_ACTION_CREATORS } from "../redux/groups/group-action-creators";
import { selectSusu } from "../redux/susu/susu-reducer";
import { SUSU_ACTION_CREATORS } from "../redux/susu/susu-action-creators";
import Empty from "./empty";

const SusuRegulationsForm = () => {
    
    const { createSusuRegulations } = useSelector(selectSusu);
    
    const [regulation, setRegulation] = useState("");
    const [error, setError] = useState({});
    
    const [regulations, setRegulations] = useState([...createSusuRegulations]);
    
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
            setError({ error, regulations: "Add at least one regulation" });
            return;
        } else {
            setError({ error, regulations: null });
        }
        dispatch(SUSU_ACTION_CREATORS.saveSusuRegulations(regulations));
        dispatch(SUSU_ACTION_CREATORS.susuGoToNextPage());
    };
    
    return (
        <ScrollView flex={1} minHeight="100%">
            <Box borderBottomLeftRadius={0}
                 borderTopRightRadius={0}
                 borderBottomRightRadius={16}
                 borderTopLeftRadius={16}
                 p={5}
                 shadow={0}
                 backgroundColor="white"
                 m={2}>
                <Text textAlign="center" fontSize="sm" color="muted.500">Susu Regulations</Text>
                
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
                        px={4}
                        isInvalid={Boolean(error.regulation)}
                        _focus={{ borderColor: "gray.400" }}
                        _invalid={{ borderColor: "red.400", borderWidth: 1, borderStyle: "solid" }}
                        isFullWidth={true}
                        mb={1}
                        size="md"
                        multiline={true}
                        value={regulation}
                        name="regulation"
                        type="text"
                        onChangeText={regulation => setRegulation(regulation)}
                        isRequired={true}
                    />
                    {error.regulation && <Text color="error.400">{error.regulation}</Text>}
                    
                    <Button
                        mt={2}
                        backgroundColor="primary.600"
                        py={3}
                        borderBottomLeftRadius={0}
                        borderTopRightRadius={0}
                        borderBottomRightRadius={16}
                        borderTopLeftRadius={16}
                        onPress={addRegulation}
                        _text={{ color: "white", fontSize: "xs" }}
                        variant="subtle">
                        Add
                    </Button>
                </Box>
            </Box>
            
            <Box borderBottomLeftRadius={0}
                 borderTopRightRadius={0}
                 borderBottomRightRadius={16}
                 borderTopLeftRadius={16} p={4} shadow={0} backgroundColor="white" m={2}>
                <Text textAlign="center" fontSize="sm" color="muted.500">Susu Regulations ({regulations.length})</Text>
                
                <Divider width="100%" my={2} />
                
                <Box>
                    {regulations.length === 0 ? (
                        <Box>
                            <Empty description="No regulations yet" title="Susu Regulations" />
                        </Box>
                    ) : (
                        regulations.map((regulation, index) => {
                            return (
                                <SingleRegulationListItem
                                    key={index}
                                    regulation={regulation}
                                    showDelete={true}
                                    index={index}
                                    removeRegulation={removeRegulation}
                                />
                            );
                        })
                    )}
                </Box>
            </Box>
            
            
            <Box px={4} mt={3} flexDirection="row">
                <Button
                    flexGrow={1}
                    mt={2}
                    mr={1}
                    borderColor="primary.600"
                    backgroundColor="white"
                    borderWidth={1}
                    py={3}
                    borderBottomLeftRadius={0}
                    borderTopRightRadius={0}
                    borderBottomRightRadius={16}
                    borderTopLeftRadius={16}
                    _text={{ color: "primary.600", fontSize: "xs" }}
                    onPress={() => dispatch(GROUP_ACTION_CREATORS.groupGoToPreviousPage())}
                    variant="subtle">
                    Previous
                </Button>
    
                {regulations.length > 0 && (
                    <Button
                        mt={2}
                        flexGrow={1}
                        backgroundColor="primary.600"
                        py={3}
                        borderBottomLeftRadius={0}
                        borderTopRightRadius={0}
                        borderBottomRightRadius={16}
                        borderTopLeftRadius={16}
                        _text={{color: 'white', fontSize: 'xs'}}
                        onPress={handleGroupRegulationsSubmit}
                        variant="subtle">
                        Next
                    </Button>
                )}
            </Box>
        </ScrollView>
    );
};

export default SusuRegulationsForm;
