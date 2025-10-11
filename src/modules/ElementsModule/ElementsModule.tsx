import React, { useState } from "react";
import NiceModal from "@ebay/nice-modal-react";
import CreatableSelect from "react-select/creatable";
import Input from "../../components/global/forms/Input";
import Search from "../../components/global/forms/Search";
import { Button } from "../../components/global/button/Button";
import FormCheck from "../../components/global/forms/FormCheck";
import SelectComponent from "../../components/global/forms/Select";
import { Container } from "../../components/global/container/Container";

const data = [
  { name: "Wade Cooper" },
  { name: "Arlene Mccoy" },
  { name: "Devon Webb" },
  { name: "Tom Cook" },
  { name: "Tanya Fox" },
];

const ElementsModule = () => {
  const [selected, setSelected] = useState();

  const handleAuth = (modalName: string) => {
    NiceModal.show(modalName);
  };
  const [value, setValue] = useState();
  const handleChange = (e: any) => {
    setValue(e.target.value);
  };
  const [PasswordValue, setPasswordValue] = useState();
  const handlePasswordChange = (e: any) => {
    setPasswordValue(e.target.value);
  };

  const [keywordOptions] = useState([
    "Artificial Intelligence",
    "Cybersecurity",
    "Internet of Things",
    "Blockchain",
    "Augmented Reality",
  ]);

  return (
      <Container size="lg" className="space-y-10 py-10">
        <h1 className="h1">Whereas recognition of the inherent dignity</h1>
        <h2 className="h2">Whereas recognition of the inherent dignity</h2>
        <h3 className="h3">Whereas recognition of the inherent dignity</h3>
        <div className="space-x-6">
          <Button size="lg" color="primary" onClick={() => handleAuth("login")}>
            Log In
          </Button>
          <Button
            size="lg"
            color="primary"
            variant="outline"
            onClick={() => handleAuth("login")}
          >
            Log In
          </Button>
          <Button
            size="lg"
            color="secondary"
            onClick={() => handleAuth("login")}
          >
            Log In
          </Button>
          <Button
            size="lg"
            color="secondary"
            variant="outline"
            onClick={() => handleAuth("login")}
          >
            Log In
          </Button>
          <Button onClick={() => handleAuth("login")} variant="outline">
            Log In
          </Button>
        </div>
        <FormCheck label="default checkbox" id="3" />
        <Input
          name="name"
          type="text"
          size="md"
          label="Enter Your Name"
          placeholder="Enter Your Name"
          value={value}
          onChange={handleChange}
        />
        <Input
          name="pass"
          type="password"
          size="md"
          label="Enter Your Password"
          placeholder="Enter Your Password"
          value={PasswordValue}
          onChange={handlePasswordChange}
        />
        <Search value={value} onChange={handleChange} />
        <SelectComponent
          Data={data}
          selected={selected}
          setSelected={setSelected}
          placeholder="Select Value"
        />
        <CreatableSelect
          isMulti
          placeholder="Select Keywords"
          options={keywordOptions.map((keyword) => ({
            value: keyword,
            label: keyword,
          }))}
          className="w-100 w-md-650 rounded-10 border border-grayLight text-start"
        />
      </Container>
  );
};

export default ElementsModule;
