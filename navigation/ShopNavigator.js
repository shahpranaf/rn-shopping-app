import React from "react";
import { createStackNavigator } from "react-navigation-stack";
// import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import ProductsOverviewScreen from "../screens/shop/ProductOverviewScreen";
import { Platform, View, Button, SafeAreaView } from "react-native";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";
import { useDispatch } from "react-redux";
import AuthScreen from "../screens/user/AuthScreen";
import StartupScreen from "../screens/StartupScreen";
import * as authActions from '../store/actions/auth';


const defaultNavigationStyle = {
	headerStyle: {
		backgroundColor: Platform.OS === "android" ? Colors.primary : "",
	},
	// headerTitleStyle: {
	// 	fontFamily: "open-sans-bold",
	// },
	// headerBackTitleStyle: {
	// 	fontFamily: "open-sans",
	// },
	headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
	// headerTitle: "A Screen",
};

const ProductsNavigator = createStackNavigator(
	{
		ProductsOverview: ProductsOverviewScreen,
		ProductDetail: ProductDetailScreen,
		Cart: CartScreen,
	},
	{
		initialRouteName: 'ProductsOverview',
		navigationOptions: {
			drawerIcon: (drawerConfig) => (
				<Ionicons
					name={Platform.OS === "android" ? "md-home" : "ios-home"}
					size={23}
					color={drawerConfig.tintColor}
				/>
			),
		},
		defaultNavigationOptions: defaultNavigationStyle,
		//initialRouteName: "Categories",
		//mode: "modal", // 'card'
	}
);

const OrdersNavigator = createStackNavigator(
	{
		Orders: OrdersScreen,
	},
	{
		navigationOptions: {
			drawerIcon: (drawerConfig) => (
				<Ionicons
					name={Platform.OS === "android" ? "md-list" : "ios-list"}
					size={23}
					color={drawerConfig.tintColor}
				/>
			),
		},
		defaultNavigationOptions: defaultNavigationStyle,
	}
);

const AdminNavigator = createStackNavigator(
	{
		UserProducts: UserProductsScreen,
		EditProduct: EditProductScreen,
	},
	{
		navigationOptions: {
			drawerIcon: (drawerConfig) => (
				<Ionicons
					name={Platform.OS === "android" ? "md-create" : "ios-create"}
					size={23}
					color={drawerConfig.tintColor}
				/>
			),
		},
		defaultNavigationOptions: defaultNavigationStyle,
	}
);

const ShopNavigator = createDrawerNavigator(
	{
		Products: ProductsNavigator,
		Orders: OrdersNavigator,
		Admin: AdminNavigator,
	},
	{
		contentOptions: {
			activeTintColor: Colors.primary,
		},
		contentComponent: (props) => {
			const dispatch = useDispatch();
			return (
				<View style={{ flex: 1, paddingTop: 20 }}>
					<SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
						<DrawerItems {...props} />
						<Button
							title="Logout"
							color={Colors.primary}
							onPress={() => {
								dispatch(authActions.logout());
								// props.navigation.navigate('Auth');
							}}
						/>
					</SafeAreaView>
				</View>
			);
		},
	}
);
const AuthNavigator = createStackNavigator(
	{
		Auth: AuthScreen,
	},
	{
		defaultNavigationOptions: defaultNavigationStyle,
	}
);

const MainNavigator = createSwitchNavigator({
	Startup: StartupScreen,
	Auth: AuthNavigator,
	Shop: ShopNavigator,
});

export default createAppContainer(MainNavigator);
