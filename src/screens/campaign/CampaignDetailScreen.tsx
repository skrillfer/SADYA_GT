import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity
} from "react-native";
import moment from "moment";
import { CampaignModel } from "../../models";
import { Theme } from "../../theme";
import { Divider, HtmlView } from "../../components";
import { useLocalization } from "../../localization";
import { useNavigation, useRoute } from "@react-navigation/native";

type TProps = {};

export const CampaignDetailScreen: React.FC<TProps> = props => {
  const { getString } = useLocalization();
  const route = useRoute();
  const navigation = useNavigation();

  const model = JSON.parse(route.params["model"]) as CampaignModel;

  navigation.setOptions({ title: model.title });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Image source={{ uri: model.imageUrl }} style={styles.image} />
      <Divider />
      <View style={styles.headerContent}>
        <View style={styles.flex1}>
          <Text style={styles.lastDateTitle}>{getString("Last Date")}</Text>
          <Text style={styles.lastDateText}>
            {moment(model.endDate).format("LL")}
          </Text>
        </View>
        <View style={{ justifyContent: "center" }}>
          <TouchableOpacity style={styles.buttonContent}>
            <Text style={styles.buttonText}>{getString("Apply Campaign")}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Divider />
      <View style={styles.descContent}>
        <Text style={styles.titleText}>{model.title}</Text>
        <Text style={styles.shortDescText}>{model.shortDescription}</Text>
        <HtmlView htmlContent={model.htmlContent} imagesMaxWidthOffset={32} />
      </View>
      <Divider />
      <View style={styles.campaignSectionContent}>
        <Text style={styles.campaignSectionTitle}>
          {getString("Campaign Conditions")}
        </Text>
        <View style={styles.campaignSectionList}>
          {model.conditions.map((item, index) => {
            return (
              <View style={styles.listItem} key={`listKey${index}`}>
                <View style={styles.listItemCircle} />
                <Text style={styles.listItemText}>{item}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  flex1: { flex: 1 },
  image: {
    height: 170,
    backgroundColor: Theme.colors.grayForBoxBackground
  },
  headerContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: "row"
  },
  lastDateTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: Theme.colors.primaryColor
  },
  lastDateText: {
    fontSize: 14,
    fontWeight: "600",
    color: Theme.colors.primaryColor,
    marginTop: 2
  },
  buttonContent: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    backgroundColor: Theme.colors.primaryColor,
    borderRadius: 4
  },
  buttonText: { color: "white", fontWeight: "600" },
  descContent: { paddingHorizontal: 16, paddingVertical: 12 },
  titleText: {
    fontWeight: "600",
    color: Theme.colors.black,
    fontSize: 17
  },
  shortDescText: {
    fontSize: 15,
    color: Theme.colors.black,
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 6
  },
  campaignSectionContent: { paddingHorizontal: 16, paddingVertical: 16 },
  campaignSectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Theme.colors.black
  },
  campaignSectionList: { marginTop: 8 },
  listItem: {
    flexDirection: "row",
    paddingVertical: 4
  },
  listItemCircle: {
    width: 8,
    height: 8,
    borderRadius: 10,
    backgroundColor: Theme.colors.primaryColor,
    marginTop: 5
  },
  listItemText: {
    flex: 1,
    color: Theme.colors.black,
    fontSize: 14,
    marginStart: 12
  }
});
