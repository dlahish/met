import React, { Component, PropTypes } from 'react'
import { NewCategoryForm } from '../../components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Actions, ActionConst } from 'react-native-router-flux'
import * as categoriesActionCreators from '../../actions/categories'
import { View, Text, StyleSheet } from 'react-native'

class NewCategory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      type: 'Income',
      iconName: '',
      isValid: false,
      error: '',
      formValidateInfo: undefined
    }
  }

  componentDidMount() {
    if (this.props.editMode) {
      this.setState({
        name: this.props.category.name,
        type: this.props.categoryType,
        iconName: this.props.categoryIconIndex[this.props.category.name]
      })
    } else {
      this.setState({
        type: this.props.categoryType
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ iconName: nextProps.iconName })
  }

  handleValueChange = (values, formValidateInfo) => {
    this.setState({
      isValid: formValidateInfo.isValid,
      name: values.name,
      error: '',
      formValidateInfo
    })
  }

  onSaveNewCategory = () => {
    const s = this.state
    if (s.isValid) {
      if (this.props.editMode) this.props.saveCategoryIcon(this.state)
      else this.props.addNewCategory(this.state)
      this.setState({
        name: '',
        type: 'Income',
        iconName: '',
        isValid: false,
        error: ''
      })
      this.props.forcedNewProps()
      Actions.pop()
    } else {
      this.setState({ error: 'Category name is required' })
    }
  }

  onTypeChange = (type) => {
    this.setState({ type: type })
  }

  render() {
    return (
      <View style={styles.container}>
        <CustomNavBar
          onLeftPress={() => Actions.pop()}
          onRightPress={this.onSaveNewCategory}
          title='New Category'
          leftButton='Cancel'
          rightButton='Save'
        />
        <NewCategoryForm
          handleValueChange={this.handleValueChange}
          onTypeChange={this.onTypeChange}
          categoryType={this.state.type}
          categoryName={this.state.name}
          iconName={this.state.iconName}
          error={this.state.error}
        />
      </View>
    )
  }
}

NewCategory.PropTypes = {
  categoryType: PropTypes.string,
  iconName: PropTypes.string,
  categoryIconIndex: PropTypes.array,
  addNewCategory: PropTypes.func.isRequired
}

const styles = {
  container: {
    flex: 1
  }
}

export default connect(
  (state) => ({
    iconName: state.form.categoryIconName,
    categoryIconIndex: state.categories.categoryIconIndex }),
  (dispatch) => (bindActionCreators(categoriesActionCreators, dispatch))
)(NewCategory)
