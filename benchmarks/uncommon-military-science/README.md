### Data
![screenshots](https://i.imgur.com/9ipZwOj.jpeg)

| Game Statistics          | V1     | V2 Silo | V2 Belts |
|--------------------------|--------|---------|----------|
| Max UPS                  | 1142.5 | 1238.3  | 1196.4   |
| Update Average           | 0.892  | 0.791   | 0.833    |
| Update Min               | 0.631  | 0.546   | 0.635    |
| Update Max               | 1.148  | 1.195   | 1.182    |
| Game Update Average      | 0.834  | 0.745   | 0.785    |
| Game Update Min          | 0.604  | 0.504   | 0.606    |
| Game Update Max          | 1.124  | 1.152   | 1.159    |
| Control Behaviors Average| 0.102  | 0.108   | 0.101    |
| Control Behaviors Min    | 0.072  | 0.071   | 0.073    |
| Control Behaviors Max    | 0.332  | 0.247   | 0.250    |


| Entity Statistics         | V1     | V2 Silo | V2 Belts |
|---------------------------|--------|---------|----------|
| Assembling Machine Average| 0.072  | 0.065   | 0.066    |
| Assembling Machine Min    | 0.035  | 0.020   | 0.031    |
| Assembling Machine Max    | 0.134  | 0.272   | 0.291    |
| Furnace Average           | 0.089  | 0.089   | 0.089    |
| Furnace Min               | 0.056  | 0.038   | 0.063    |
| Furnace Max               | 0.167  | 0.213   | 0.170    |
| Inserter Average          | 0.196  | 0.152   | 0.195    |
| Inserter Min              | 0.014  | 0.072   | 0.122    |
| Inserter Max              | 0.306  | 0.285   | 0.416    |



### 🔧 **Performance Summary**

#### **Max UPS (Higher is Better)**

* **V2 Silo**: **1238.3**
* **V2 Belts**: 1196.4
* **V1**: 1142.5
  ✅ *V2 Silo is the most efficient overall in terms of game speed.*

---

### 🧠 **Control Behaviors**

* **V1**: 0.102 avg / 0.072 min / **0.332 max**
* **V2 Silo**: 0.108 avg / 0.071 min / 0.247 max
* **V2 Belts**: **0.101 avg** / 0.073 min / 0.250 max
  ✅ *V2 Belts has the most consistent and lowest average time.*

---

### ⚙️ **Assembling Machines**

* **V2 Silo** has the **lowest average** time at **0.065 ms**, but a **high max** of **0.272 ms**.
* **V1** is more balanced but slower on average: **0.072 ms**.
* **V2 Belts** has the **highest max** at **0.291 ms**, suggesting possible spikes.
  🔍 *V2 Silo is likely more optimized unless that max time is a consistent problem.*

---

### 🔥 **Furnaces**

* **All designs** show **equal average times** at **0.089 ms**.
* **V2 Silo** again shows the **lowest min** at **0.038 ms**, but the **highest max** at **0.213 ms**.
* **V1** is a middle ground with lower variance.
  🟰 *Not much to choose here—performance is similar.*

---

### 🏗️ **Inserters**

* **V2 Silo**: Lowest average (**0.152 ms**) and controlled max (**0.285 ms**)
* **V2 Belts**: Almost the same avg as V1 but with a **spike up to 0.416 ms max**—a red flag
* **V1**: Higher average than V2 Silo and equal to V2 Belts, but a safer max
  ✅ *V2 Silo is clearly superior for inserter performance.*

---

### ✅ **Conclusion**

| Category            | Best Design | Notes                            |
| ------------------- | ----------- | -------------------------------- |
| Max UPS             | V2 Silo     | Fastest update rate              |
| Control Behaviors   | V2 Belts    | Slightly lower average           |
| Assembling Machines | V2 Silo     | Most efficient                   |
| Furnaces            | Tie         | Same average across all          |
| Inserters           | V2 Silo     | Best balance of avg and max time |

👉 **V2 Silo** stands out as the most efficient and stable overall, particularly in UPS and entity performance. **V2 Belts** is close behind, with a slight edge in control logic efficiency but spikes in inserter timing. **V1** is the least performant across the board.

Let me know if you’d like visual graphs or further breakdowns!