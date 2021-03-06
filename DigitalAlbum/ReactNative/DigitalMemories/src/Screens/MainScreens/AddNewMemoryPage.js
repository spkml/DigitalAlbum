import React, { useState } from "react"
import { View, ScrollView, StyleSheet, Dimensions, Text, Image, Button, TouchableOpacity } from "react-native"

import CustomHeader from "../../CustomComponents/CustomHeader";
import CustomButton from "../../CustomComponents/CustomButton";
import CustomTextInput from "../../CustomComponents/CustomTextInput";
import CustomCarouselView from "../../CustomComponents/CustomCarouselView";
import CustomHeaderContentCardView from "../../CustomComponents/CustomHeaderContentCardView";

import { IMAGE_PROFILE_ICON, IMAGE_BACK } from "../../Constants/LocalImages";
import AppStyleConstants from "../../Constants/AppStyleConstants";
import CameraView from "../../CustomComponents/AppLocalComponents/CameraView";
import CustomActionSheet from "../../CustomComponents/CustomActionSheet";
import { ADD_NEW_PERSON_PAGE, MEMORY_DETAIL_PAGE, PERSON_DETAIL_PAGE } from "../../Helpers/PageNameConstants";
import { setTimeTicksAsID } from "../../Helpers/GetDynamicID";

const AddNewMemoryPage = (props) => {

    const NONE = "NONE";
    const ADD_IMAGES = "ADD_IMAGES";
    const ADD_PERSONS = "ADD_PERSONS";
    const DUMMY_ID = "DummyId";

    const MEMORY_NAME_ID = "MEMORY_NAME_ID";
    const MEMORY_LABEL_ID = "MEMORY_LABEL_ID";
    const MEMORY_DATE_ID = "MEMORY_DATE_ID";
    const MEMORY_DESCRIPTION_ID = "MEMORY_DESCRIPTION_ID";
    const LOCATION_INFO_ID = "LOCATION_INFO_ID";


    const [showCamera, setShowCamera] = useState(false);
    const [showImageOptions, setShowImageOptions] = useState(false);
    const [showPersonOptions, setShowPersonOptions] = useState(false);
    const [imageOptionsCallerID, setImageOptionsCallerID] = useState(NONE);
    // const [formData, setFormData] = useState({
    //     ,
    // });


    const onBackButtonPressHandler = () => {
        props.navigation.pop();
    }

    const addImage = {
        imageID: DUMMY_ID,
        imageURL: ""
    };

    const addPerson = {
        contactId: DUMMY_ID,
        contactFirstName: "Hello World 1",
        contactLastName: "",
        contactImageURL: IMAGE_PROFILE_ICON,
        contactNickName: "",
        contactRelation: "",
        contactMobileNo: "",
        contactEmailID: ""
    };

    const [memory, setMemory] = useState({
        images: [],
        persons: [],
        memoryInfo: {
            memoryName: "",
            memoryLabel: "",
            memoryDate: "",
            memoryDescription: "",
            memoryLocation: {
                latitude: 0,
                longitude: 0,
                loctionDescription: ""
            }
        }
    });

    const onCameraSnappedHandler = (uri, callerID) => {
        console.log(uri);
        if (callerID === ADD_IMAGES) {
            let imagesTemp = memory.images;
            const newImage = {
                imageID: setTimeTicksAsID(),
                imageURL: uri
            };
            imagesTemp.push(newImage);
            setMemory({ ...memory, images: imagesTemp })
        }
        else if (callerID === ADD_IMAGES) {
        }
        setShowCamera(false);
    }

    const onClosePressHandler = () => {
        setShowCamera(false);
    }

    const onSelectImage = (id, callerID) => {
        console.log(id);
        if (id === DUMMY_ID) {
            setImageOptionsCallerID(callerID);
            setShowImageOptions(true);
        }
        else 
        {
            // navigateTo();
         }
    }

    const onCancelPressHandler = (id) => {
        if (id === "cameraOptionsAS") {
            setShowImageOptions(false);
        }
        else if(id === "personOptionsAS")
        {
            setShowPersonOptions(false);
        }
        console.log("alert close")
    }

    const onCameraSelectionHandler = () => {
        setShowImageOptions(false);
        setShowCamera(true);
    }

    const onGallerySelectionHandler = () => {
        setShowImageOptions(false);
    }

    const onSelectPerson = (id, callerID) => {
        if(id === DUMMY_ID)
        {
            setShowPersonOptions(true);
        }
        else
        {
            props.navigation.navigate(PERSON_DETAIL_PAGE)
        }
    }

    const onAddNewPerson = (id, callerID) => {
        setShowPersonOptions(false);
        props.navigation.navigate(ADD_NEW_PERSON_PAGE);
    }

    const onAddExistingPerson = (id, callerID) => {
        setShowPersonOptions(false);
    }

    const onSelectLocation = () => {

    }

    const onInputChangedHandler = (inputID, value, isValid) => {
        const tempMemoryInfo= {
            ...memory.memoryInfo,
            memoryName: (inputID === MEMORY_NAME_ID) ? value : memory.memoryInfo.memoryName,
            memoryLabel: (inputID === MEMORY_LABEL_ID) ? value : memory.memoryInfo.memoryLabel,
            memoryDate: (inputID === MEMORY_DATE_ID) ? value : memory.memoryInfo.memoryDate,
            memoryDescription: (inputID === MEMORY_DESCRIPTION_ID) ? value : memory.memoryInfo.memoryDescription,
            memoryLocation: {
                latitude: memory.memoryInfo.memoryLocation.latitude,
                longitude: memory.memoryInfo.memoryLocation.longitude,
                loctionDescription: (inputID === LOCATION_INFO_ID) ? value : memory.memoryInfo.memoryLocation.loctionDescription
            }
        }
        const tempMemory = {
            ...memory,
            memoryInfo : tempMemoryInfo
        }
        console.log(tempMemory);
        setMemory(tempMemory);
    }

    const onSubmit = () => {

    }


    const roundImageView = (id, imageSource) => {
        const uiContent = (
            <View style={{ height: 100, width: 100, borderRadius: 50, borderWidth: 2, overflow: "hidden", margin: 10, alignItems: "center", justifyContent: "center" }}>
                {(id !== DUMMY_ID) ?
                    <Image style={{ height: 100, width: 100 }} source={imageSource}></Image> :
                    <Text style={{ fontSize: 40 }}>+</Text>
                }
            </View>
        )
        return uiContent;
    }


    const memoryCarouselContent = (data) => {
        const carouselView = (
            // <View key={data.key} style={{ ...styles.carouselContentMainStyle }}>
            //     {/* <Text>One</Text> */}
            //     <Image source={{uri: data.imageURL}} />
            // </View>
            <TouchableOpacity key={data.imageID} activeOpacity="0.8" onPress={() => { onSelectImage(data.imageID, ADD_IMAGES) }}>
                {roundImageView(data.imageID, { uri: data.imageURL })}
            </TouchableOpacity>
        )
        return carouselView;
    }

    const personCarouselContent = (data) => {
        const carouselView = (
            <TouchableOpacity key={data.contactId} activeOpacity="0.8" onPress={() => { onSelectPerson(data.contactId, ADD_PERSONS) }}>
                <View style={{ alignItems: "center" }}>
                    {roundImageView(data.contactId, { uri: data.contactImageURL })}
                    <Text>{(data.contactId !== DUMMY_ID) ? data.contactFirstName : "Add Person"}</Text>
                </View>
            </TouchableOpacity>
        )
        return carouselView;
    }

    const mainUIComponent = (

        <View style={styles.mainComponentStyle}>
            <CustomHeader
                headerViewStyle={styles.headerStyle}
                headerTextStyle={styles.headerTextStyle}
                title="New Memmory"
                backButtonIconSource={IMAGE_BACK}
                hideBackButton={false}
                onBackButtonPress={onBackButtonPressHandler} />

            <View style={styles.bodyHolderViewStyle}>


                <CameraView callerID={imageOptionsCallerID} visibility={showCamera} onCameraSnapped={onCameraSnappedHandler} onClosePress={onClosePressHandler} />

                <CustomActionSheet
                    visibility={showImageOptions}
                    id="cameraOptionsAS"
                    title="Select an option"
                    onCancelPress={onCancelPressHandler}
                    options={[
                        { text: "Camera", onPress: onCameraSelectionHandler },
                        { text: "Gallery", onPress: onGallerySelectionHandler },
                    ]} />

                <CustomActionSheet
                    visibility={showPersonOptions}
                    id="personOptionsAS"
                    title="Select an option"
                    onCancelPress={onCancelPressHandler}
                    options={[
                        { text: "Add New Person", onPress: onAddNewPerson },
                        { text: "Add From Existing", onPress: onAddExistingPerson },
                    ]} />

                <ScrollView>

                    <CustomHeaderContentCardView style={styles.cardStyle} headerStyle={styles.cardTitleStyle} title="Add Images">
                        {/* <CustomCarouselView> */}
                        <ScrollView
                            style={{ ...styles.scrollContent, ...props.style }}
                            horizontal={true}
                            showsHorizontalScrollIndicator={true}>
                            {memoryCarouselContent(addImage)}
                            {memory.images.map(item => memoryCarouselContent(item))}
                        </ScrollView>
                        {/* </CustomCarouselView> */}
                        {/* <CustomButton style={styles.buttonStyle} title="Add Image of Memory" onPress={onSelectImage} /> */}
                    </CustomHeaderContentCardView>

                    <CustomHeaderContentCardView style={styles.cardStyle} headerStyle={styles.cardTitleStyle} title="Add Persons">
                        <ScrollView
                            style={{ ...styles.scrollContent, ...props.style }}
                            horizontal={true}
                            showsHorizontalScrollIndicator={true}>
                            {personCarouselContent(addPerson)}
                            {memory.persons.map(item => personCarouselContent(item))}
                        </ScrollView>
                    </CustomHeaderContentCardView>

                    <CustomHeaderContentCardView style={styles.cardStyle} headerStyle={styles.cardTitleStyle} bodyStyle={styles.cardBodyStyle} title="Enter more info">
                        <CustomTextInput inputID={MEMORY_NAME_ID} placeholder="Set memory a name" inputTextStyle={styles.inputTextEntryStyle} onInputChanged={onInputChangedHandler} />
                        <CustomTextInput inputID={MEMORY_LABEL_ID} placeholder="Memory identification label" inputTextStyle={styles.inputTextEntryStyle} onInputChanged={onInputChangedHandler} />
                        <CustomTextInput inputID={MEMORY_DATE_ID} placeholder="Enter Date of memory" inputTextStyle={styles.inputTextEntryStyle} onInputChanged={onInputChangedHandler} />
                        <CustomTextInput inputID={MEMORY_DESCRIPTION_ID} placeholder="Enter Description" inputTextStyle={styles.inputTextEditorStyle} multiline={true} onInputChanged={onInputChangedHandler} />
                    </CustomHeaderContentCardView>

                    <CustomHeaderContentCardView style={styles.cardStyle} headerStyle={styles.cardTitleStyle} bodyStyle={styles.cardBodyStyle} title="No Coordinates available">
                        <Text>No Coordinated found</Text>
                        <CustomTextInput inputID={LOCATION_INFO_ID} placeholder="Enter Location name, Address or Details" inputTextStyle={styles.inputTextEditorStyle} multiline={true} onInputChanged={onInputChangedHandler} />
                        <CustomButton style={{...styles.buttonStyle, marginBottom: 10}} title="Get and Save Co-ordinates" onPress={onSelectLocation} />
                    </CustomHeaderContentCardView>

                    <CustomButton style={styles.buttonStyle} title="Add Memory" onPress={onSubmit} />
                </ScrollView>
            </View>
        </View>
        
    )
    return mainUIComponent;
}

const styles = StyleSheet.create({
    mainComponentStyle: {
        flex: 1,
        backgroundColor: AppStyleConstants.colors.MAIN_CONTAINER_COLOR
    },
    headerStyle: {
        height: 50,
        backgroundColor: AppStyleConstants.colors.MAIN_HEADER_COLOR
    },
    headerTextStyle: {
        marginRight: 50,
    },
    bodyHolderViewStyle: {
        flex: 1,
        margin: 10
    },
    inputTextEditorStyle: {
        textAlignVertical: "top",
        borderBottomWidth: 0,
        minHeight: 150
    },
    inputTextEntryStyle: {
        textAlignVertical: "top",
        borderBottomWidth: 0,
    },
    buttonStyle: {
        backgroundColor: AppStyleConstants.colors.BUTTON_COLOR,
        // color: "yellow",
        marginTop: 10,
    },

    carouselContentMainStyle: {
        flex: 1,
        alignItems: "center"
        // width: "100%"
    },

    cardStyle: {
        backgroundColor: "white",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
        // marginBottom: 20,
        // paddingBottom: 10
    },
    cardTitleStyle: {
        paddingLeft: 20,
        marginBottom: 10,
        backgroundColor: AppStyleConstants.colors.DATA_CARD_HEADER_COLOR
    },
    cardBodyStyle: {
        marginHorizontal: 10
    }
})

export default AddNewMemoryPage;