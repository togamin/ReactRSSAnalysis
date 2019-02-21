import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import axios from 'axios';
import xml2js from 'react-native-xml2js';

//解析するFeedのURL
const FEED_URL = 'https://togamin.com/feed/';

export default class App extends React.Component {
  state = {
   itemList:[],
  }
  renderCell({item}){
    return(
      <View style = {styles.itemContainer}>
        <Text style = {styles.itemTitle}>{item.title}</Text>
        <Text style = {styles.itemLink}>{item.link}</Text>
      </View>
    );
  }
  componentDidMount() {
    axios.get(FEED_URL).then(response => {
      const xml = response.data;
      const parser = xml2js.Parser();
      parser.parseString(xml, (err, result) => {
        console.log(result);
        const items = result.rss.channel[0].item
        itemList = items.map(function(item){
          const itemInfo = [];
          itemInfo['title'] = item.title;
          itemInfo['link'] = item.link
          return itemInfo;
        });
        console.log(itemList);
        this.setState({itemList});
      });
    });
  }


  render() {
    return (
      <View style={styles.container}>
        <FlatList data = {this.state.itemList} renderItem = {this.renderCell.bind(this)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer:{
    margin:9,
    padding:9,
    borderRadius:9,
    backgroundColor:'#ccccff',
  },
  itemTitle:{
    fontSize:18,
  },
  itemLink:{
    fontSize:12,
  },
});
