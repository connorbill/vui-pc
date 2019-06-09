## Addr

Wird zum automatischen Befüllen von Provinzen und Städten auf der Seite verwendet



### Grundsätzliche Verwendung



:::demo 

```html
<template>
<div>
  <vui-addr
        select-default-name="Bitte wählen Sie"
      :address-config="addressConfig"
      :province-arr="allProvince"
      :address-obj="{
          'provinceId': surveyData.table.province,
          'cityId': surveyData.table.city,
          'areaId': surveyData.table.county,
          'address': surveyData.table.address,
      }"
      v-on:province="function(event){surveyData.table.province = event.target.value}"
      v-on:city="function(event){surveyData.table.city = event.target.value}"
      v-on:area="function(event){surveyData.table.county = event.target.value}"
      v-on:address="function(event){surveyData.table.address = event.target.value}"
      v-on:addresstext="function(event){surveyData.table.addressText = event}"
  ></vui-addr>
</div>
</template>
<script>
   export default {
      data(){
        return {
        allProvince: [],
        addressConfig: {
          sProvinceInterface: '/provinceCtrl/findHatProvinceAll',
          sCityInterface: '/provinceCtrl/findByCityParentCode',
          sAreaInterface: '/provinceCtrl/findByAreaParentCode',
          sCityParam: 'code',
          sAreaParam: 'code',
          sProvinceId: 'provinceid',
          sProvinceName: 'province',
          sCityId: 'cityid',
          sCityName: 'city',
          sAreaId: 'areaid',
          sAreaName: 'area'
        },
        surveyData: {
                table: {
                    province: '',
                    city: '',
                    county: '',
                    address: '',
                },
            }
        };
      },
      mounted(){
          this.getProvince();
      },
      methods: {
        getProvince: function() {
            
        }
      }
   };
 </script>

```
:::


### Attributes
| Parameter          | Beschreibung            | Typ            | Optionaler Wert                 | Standardwert   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| address-config | Kann nicht passieren, es gibt Standardwerte, | Object | — |  |
| address-config(sProvinceInterface) | Provinziale Schnittstellenadresse| string | — | /provinceCtrl/findHatProvinceAll |
| address-config.sCityInterface | Adresse der Stadtschnittstelle| string | — | /provinceCtrl/findByCityParentCode |
| address-config.sAreaInterface | Bereichsschnittstellenadresse| string | — | /provinceCtrl/findByAreaParentCode |
| address-config.sCityParam | Ruft den Schnittstellennamen der Stadtdaten ab| string | — | code |
| address-config.sAreaParam | Liefert den Namen der Schnittstelle der Zonendaten | string | — | code |
| address-config.sProvinceId | Der Name des Felds, das jedem Optionswert des Auswahlfelds für die Provinz entspricht| string | — | provinceid |
| address-config.sProvinceName |Der Name des Feldes, das von jeder Option im Auswahlfeld für die Provinz angezeigt wird| string | — | province |
| address-config.sCityId | Stadtauswahlfeld für jeden Feldwert, der dem Wert der Option entspricht| string | — | cityid |
| address-config.sCityName |Das Auswahlfeld Stadt zeigt den Feldnamen für jede Option an| string | — | city |
| address-config.sAreaId | Der Feldname, der jedem Optionswert des Bereichsauswahlfelds entspricht| string | — | areaid |
| address-config.sAreaName |Der Feldname, der von jeder Option im Bereichsauswahlfeld angezeigt wird| string | — | area |
| province-arr | Alle Provinz-Arrays, erfordern (Werte, die in allen Konfigurationsoptionen übergeben werden müssen) | Array | — | [] |
| address-obj | Wert der Landesadresse | Object | - | |
| address-obj(provinceId) | Provinzieller Wert | string | - | 空|
| address-obj(cityId) | Stadtwert | string | - | 空|
| address-obj(areaId) | Flächenwert | string | - | 空|
| address-obj(address) | Der Wert der Adresse | string | - | 空|
| province-rule-detail | Provinziale Überprüfungsregeln | string | - | []|
| city-rule-detail | Überprüfungsregeln der Stadt | string | - | []|
| area-rule-detail |Zonenüberprüfungsregel | string | - | []|
| address-rule-detail | Regel zur Adressüberprüfung | string | - | []|


### Events

| Ereignisname | Beschreibung | Rückrufparameter |
|---------|--------|---------|
| province | wenn sich der Auswahlwert der Provinz ändert | $event   |
| city | wenn sich der Auswahlwert der Stadt ändert | $event  |
| area |  wenn sich der Wert für die Zonenauswahl ändert | $event  |
| address | wenn sich der Adresswert ändert | $event   |
| addresstext | an der Adresse der Provinz | value |
