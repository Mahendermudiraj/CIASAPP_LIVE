package com.cias.utility;

import java.sql.Connection;
import java.sql.DriverManager;


public class DatabaseConnection {

	public static Connection getConnection() {
		Connection conn = null;

		String url = "jdbc:mysql://10.47.8.15:3306/BIASDEVDB";
		String driver = "com.mysql.jdbc.Driver";
		try {
			Class.forName(driver).newInstance();
			conn = DriverManager.getConnection(url, "misdbusr", "Misdb@123");

		} catch (Exception e) {
	  }
		return conn;
	}

}
