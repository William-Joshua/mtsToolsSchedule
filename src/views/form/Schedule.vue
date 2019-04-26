<template>
  <div id="pageTable">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm12>
          <h3>生产计划排产</h3>
        </v-flex>
        <v-flex lg12>
          <v-card class="mb-4">
            <v-toolbar color="teal" dark flat dense cad>
              <v-toolbar-title class="subheading">
                排产单查询
              </v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text class="">
              <payment-form>
                <div slot="widget-content">
                  <v-container>
                    <v-layout row>
                      <v-flex xs2>
                        <v-subheader>排产单号</v-subheader>
                      </v-flex>
                      <v-flex xs4>
                        <v-text-field
                          label="排产单号"
                          v-model="workid"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs2>
                        <v-subheader>产品型号</v-subheader>
                      </v-flex>
                      <v-flex xs4>
                        <v-select
                          label="Select"
                          :items="countries"
                          v-model="e3"
                          :error-messages="['Please select an option']"
                          item-text="country"
                          item-value="abbr"
                        ></v-select>
                      </v-flex>
                      <v-flex xs2>
                        <v-subheader>排产日期</v-subheader>
                      </v-flex>
                      <v-flex xs4>
                        <v-menu
                          ref="menu"
                          lazy
                          :close-on-content-click="false"
                          v-model="menu"
                          transition="scale-transition"
                          offset-y
                          full-width
                          :nudge-right="40"
                          min-width="290px"
                          :return-value.sync="date"
                        >
                          <v-text-field
                            slot="activator"
                            label="Picker in menu"
                            v-model="date"
                            prepend-icon="event"
                            readonly
                          ></v-text-field>
                          <v-date-picker v-model="date" no-title scrollable>
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="menu = false"
                              >Cancel</v-btn
                            >
                            <v-btn
                              flat
                              color="primary"
                              @click="$refs.menu.save(date)"
                              >OK</v-btn
                            >
                          </v-date-picker>
                        </v-menu>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </div>
              </payment-form>
            </v-card-text>
          </v-card>
          <v-card>
            <v-toolbar card color="white">
              <v-text-field
                flat
                solo
                prepend-icon="search"
                placeholder="Type something"
                v-model="search"
                hide-details
                class="hidden-sm-and-down"
              ></v-text-field>
              <v-btn icon>
                <v-icon>filter_list</v-icon>
              </v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text class="pa-0">
              <v-data-table
                :headers="complex.headers"
                :search="search"
                :items="complex.items"
                :rows-per-page-items="[10, 25, 50, { text: 'All', value: -1 }]"
                class="elevation-1"
                item-key="name"
                select-all
                v-model="complex.selected"
              >
                <template slot="items" slot-scope="props">
                  <td>
                    <v-checkbox
                      primary
                      hide-details
                      v-model="props.selected"
                    ></v-checkbox>
                  </td>
                  <td>
                    <v-avatar size="32">
                      <img :src="props.item.avatar" alt="" />
                    </v-avatar>
                  </td>
                  <td>{{ props.item.name }}</td>
                  <td>{{ props.item.name }}</td>
                  <td>{{ props.item.name }}</td>
                  <td>{{ props.item.name }}</td>
                  <td>{{ props.item.name }}</td>
                  <td>{{ props.item.name }}</td>
                  <td>
                    <v-btn
                      depressed
                      outline
                      icon
                      fab
                      dark
                      color="primary"
                      small
                    >
                      <v-icon>edit</v-icon>
                    </v-btn>
                    <v-btn depressed outline icon fab dark color="pink" small>
                      <v-icon>delete</v-icon>
                    </v-btn>
                  </td>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
export default {
  data() {
    return {
      search: "",
      complex: {
        selected: [],
        headers: [
          {
            text: "工单号",
            value: "workid"
          },
          {
            text: "产品名称",
            value: "devicename"
          },
          {
            text: "产品型号",
            value: "devicemodel"
          },
          {
            text: "生产数量",
            value: "deviceamount"
          },
          {
            text: "排产日期",
            value: "planproddate"
          },
          {
            text: "实际生产日期",
            value: "currproddate"
          },
          {
            text: "状态",
            value: "prodstatus"
          }
        ],
        items: null
      },
      basic: {
        headers: [
          {
            text: "Dessert (100g serving)",
            align: "left",
            sortable: false,
            value: "name"
          },
          { text: "Calories", value: "calories" },
          { text: "Fat (g)", value: "fat" },
          { text: "Carbs (g)", value: "carbs" },
          { text: "Protein (g)", value: "protein" },
          { text: "Iron (%)", value: "iron" }
        ],
        items: [
          {
            value: false,
            name: "Frozen Yogurt",
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: "1%"
          },
          {
            value: false,
            name: "Ice cream sandwich",
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: "1%"
          },
          {
            value: false,
            name: "Eclair",
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: "7%"
          },
          {
            value: false,
            name: "Cupcake",
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: "8%"
          },
          {
            value: false,
            name: "Gingerbread",
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            iron: "16%"
          },
          {
            value: false,
            name: "Jelly bean",
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            iron: "0%"
          },
          {
            value: false,
            name: "Lollipop",
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            iron: "2%"
          },
          {
            value: false,
            name: "Honeycomb",
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            iron: "45%"
          },
          {
            value: false,
            name: "Donut",
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            iron: "22%"
          },
          {
            value: false,
            name: "KitKat",
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: "6%"
          }
        ]
      },
      picker: null,
      picker2: null,
      //
      arrayEvents: null,
      date1: null,
      date2: null,
      //
      date: null,
      menu: false,
      modal: false
    };
  },
  mounted() {
    let postPara = { userID: "0001" };
    axios
      .post("/api/Users/GetUserDetailByUserID", qs.stringify(postPara))
      .then(function(response) {
        alert(response);
      })
      .catch(function(error) {
        alert(error);
      });
    this.arrayEvents = [...Array(6)].map(() => {
      const day = Math.floor(Math.random() * 30);
      const d = new Date();
      d.setDate(day);
      return d.toISOString().substr(0, 10);
    });
  },
  methods: {
    functionEvents(date) {
      const [, , day] = date.split("-");
      return parseInt(day, 10) % 3 === 0;
    }
  }
};
</script>
