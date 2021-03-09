import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  SafeAreaView,
  Text,
  StyleSheet,
  TextInput,
} from 'react-native';

const SearchBar = () => {
  const [filterData, setFilterData] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    const apiURL = 'https://jsonplaceholder.typicode.com/posts';
    fetch(apiURL)
      .then((resp) => resp.json())
      .then((responseJson) => {
        setFilterData(responseJson);
        setMasterData(responseJson);
      })
      .catch((err) => console.log(err));
  };

  const searchFilter = (text) => {
    if (text) {
      const newData = masterData.filter((item) => {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilterData(newData);
      setSearch(text);
    } else {
      setFilterData(masterData);
      setSearch(text);
    }
  };

  const ItemView = ({item}) => {
    return (
      <Text style={styles.itemStyle}>
        {item.id}
        {'. '}
        {item.title.toUpperCase()}
      </Text>
    );
  };

  const ItemSeparatorView = () => (
    <View style={{height: 0.5, width: '100%', backgroundColor: '#c8c8c8'}} />
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <TextInput
          style={styles.textInputStyle}
          value={search}
          placeholder="search here..."
          underlineColorAndroid="transparent"
          onChangeText={(text) => searchFilter(text)}
        />
        <FlatList
          data={filterData}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  itemStyle: {
    padding: 15,
  },
  textInputStyle: {
    height: 50,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#009688',
    backgroundColor: '#fff',
  },
});

export default SearchBar;
