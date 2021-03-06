import React, { useState, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Agenda } from "react-native-calendars";
import { useNavigation } from "@react-navigation/native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import { CalendarItemRow } from "../../components";
import NavigationNames from "../../navigations/NavigationNames";
import { FabButton, Button } from "../../components/buttons";
import {
  globalAppointmentDate,
  globalAppointment
} from "../../services/DashboardService";
import { useLocalization } from "../../localization";
import { Theme } from "../../theme";

type IState = {
  selectedDate: string;
  items: any;
};

const weeklyAppointment = moment(globalAppointmentDate).format("YYYY-MM-DD");

const datas = {
  [weeklyAppointment]: [{ date: weeklyAppointment, title: "" }]
};

export const CalendarScreen: React.FC<{}> = props => {
  const refAgenda = useRef<Agenda>();
  const navigation = useNavigation();
  const { getString } = useLocalization();

  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );
  const [items, setItems] = useState({});

  const onPressNewAppointment = () => {
    navigation.navigate(NavigationNames.NewAppointmentScreen);
  };
  const onPressToday = () => {
    const today = new Date();
    refAgenda.current.chooseDay(today);
  };

  navigation.setOptions({
    headerRight: () => (
      <HeaderButtons>
        <Item title={getString("Today")} onPress={onPressToday} />
      </HeaderButtons>
    )
  });

  return (
    <View style={styles.container}>
      <Agenda
        ref={refAgenda}
        items={items}
        loadItemsForMonth={month => {}}
        onCalendarToggled={calendarOpened => {}}
        onDayPress={day => {
          setSelectedDate(day.dateString);
          setItems({ [day.dateString]: datas[day.dateString] });
        }}
        onDayChange={day => {}}
        selected={selectedDate}
        pastScrollRange={25}
        futureScrollRange={25}
        rowHasChanged={(r1, r2) => {
          return true;
        }}
        hideKnob={false}
        markedDates={{
          [weeklyAppointment]: {
            marked: true,
            dotColor: Theme.colors.primaryColor
          }
        }}
        onRefresh={() => {}}
        refreshing={false}
        refreshControl={null}
        theme={{
          agendaKnobColor: "#dcdcdc",
          selectedDayBackgroundColor: Theme.colors.primaryColor
        }}
        renderEmptyDate={() => {
          return <Text>-</Text>;
        }}
        renderDay={(day, item) => <View />}
        renderItem={(item, firstItemInDay) => {
          return (
            <View style={{ marginVertical: 8 }}>
              <CalendarItemRow
                style={styles.calendarItem}
                item={globalAppointment}
              />
            </View>
          );
        }}
        renderEmptyData={() => {
          return (
            <View style={styles.emptyDataContainer}>
              <Ionicons name="ios-cafe" size={32} color={Theme.colors.black} />
              <Text style={styles.emptyDataTitle}>
                {getString("No Appointment")}
              </Text>
              <View style={styles.emptyDataButtonContainer}>
                <Button
                  title={getString("New Appointment")}
                  type="outline"
                  onPress={onPressNewAppointment}
                />
              </View>
            </View>
          );
        }}
      />
      <FabButton onPress={onPressNewAppointment} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: Theme.colors.formBackground
  },
  infoText: {
    fontSize: 22,
    fontWeight: "600",
    paddingBottom: 12,
    marginTop: 8
  },
  calendarItem: {
    backgroundColor: "white",
    marginStart: 8,
    marginEnd: 8,
    shadowRadius: 2,
    shadowColor: "gray",
    shadowOpacity: 0.1,
    shadowOffset: {
      height: 2,
      width: 0
    }
  },
  emptyDataContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  emptyDataTitle: {
    color: Theme.colors.black,
    marginTop: 8,
    paddingHorizontal: 40,
    fontSize: 15,
    textAlign: "center",
    fontWeight: "100"
  },
  emptyDataButtonContainer: {
    marginTop: 24
  }
});
