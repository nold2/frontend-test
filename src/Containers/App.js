import React, { Component } from 'react';
import Select from 'react-select'
import '../css/App.css';
import locationService from '../services/locationService';

class App extends Component {
  state ={
    province: [],
    selectedProvince: 0,

    cities: [],
	  selectedCity: 0,

    districts: [],
    selectedDistrict: 0,

    subdistricts: [],
    selectedSubdistric: 0,
  };

	async componentDidMount() {
   const province =  await locationService.getProvince().then(data =>
     data.data.provinces.map(province => ({
       label: province.name,
       value: province.id
     }))
   );
   this.setState({ province });
	}

	async componentDidUpdate(prevProps, prevState) {
    if(prevState.selectedProvince !== this.state.selectedProvince){
      console.log('this.state.selectedProvince: ', this.state.selectedProvince);
	    const cities =  await locationService.getCities(this.state.selectedProvince).then(data =>
		    data.data.cities.map(city => ({
			    label: city.name,
			    value: city.id
		    }))
	    );
	    this.setState({ cities });
    }

		if(prevState.selectedCity !== this.state.selectedCity){
			console.log('this.state.selectedCity: ', this.state.selectedCity);
			const districts =  await locationService.getDistricts(this.state.selectedCity).then(data =>
				data.data.districts.map(district => ({
					label: district.name,
					value: district.id
				}))
			);
			this.setState({ districts });
		}

		if(prevState.selectedDistrict !== this.state.selectedDistrict){
			console.log('this.state.selectedDistrict: ', this.state.selectedDistrict);
			const subdistricts =  await locationService.getSubDistricts(this.state.selectedDistrict).then(data =>
				data.data.subdistricts.map(subdistrict => ({
					label: subdistrict.name,
					value: subdistrict.id
				}))
			);
			this.setState({ subdistricts });
		}
	}


	render() {
	  const { province, cities, districts, subdistricts, selectedProvince, selectedCity, selectedDistrict } = this.state;
    return (
      <div className="App">
        <h3>Province</h3>
        <Select
          options={province}
          onChange={(selected)=> this.setState({selectedProvince: selected.value })}
        />
        <h3>Cities</h3>
       <Select
         isDisabled={selectedProvince === 0}
         options={cities}
         onChange={(selected)=> this.setState({selectedCity: selected.value })}
       />
        <h3>Districts</h3>
        <Select
          isDisabled={selectedCity === 0}
          options={districts}
          onChange={(selected)=> this.setState({selectedDistrict: selected.value })}
        />
        <h3>SubDistricts</h3>
        <Select
          isDisabled={selectedDistrict === 0}
          options={subdistricts}
          onChange={(selected)=> this.setState({selectedSubdistric: selected.value })}
        />
      </div>
    );
  }
}

export default App;
