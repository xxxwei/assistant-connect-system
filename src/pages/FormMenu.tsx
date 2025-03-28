
import { useState } from 'react';
import { Card, Typography } from 'antd';
import { 
  CheckIcon, 
  ChevronDownIcon, 
  EditIcon, 
  SaveIcon, 
  XIcon 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

const { Title } = Typography;

interface FormLine {
  id: string;
  label: string;
  type: 'text' | 'dropdown';
  value: string;
  options?: { value: string; label: string }[];
  isEditing: boolean;
}

const FormMenu = () => {
  // Initial form lines with both text and dropdown fields
  const [formLines, setFormLines] = useState<FormLine[]>([
    {
      id: '1',
      label: 'Name',
      type: 'text',
      value: 'John Doe',
      isEditing: false
    },
    {
      id: '2',
      label: 'Department',
      type: 'dropdown',
      value: 'engineering',
      options: [
        { value: 'engineering', label: 'Engineering' },
        { value: 'marketing', label: 'Marketing' },
        { value: 'sales', label: 'Sales' },
        { value: 'support', label: 'Support' }
      ],
      isEditing: false
    },
    {
      id: '3',
      label: 'Position',
      type: 'text',
      value: 'Senior Developer',
      isEditing: false
    },
    {
      id: '4',
      label: 'Status',
      type: 'dropdown',
      value: 'active',
      options: [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
        { value: 'on_leave', label: 'On Leave' }
      ],
      isEditing: false
    }
  ]);

  const form = useForm();

  // Toggle edit mode for a specific form line
  const toggleEditMode = (id: string) => {
    setFormLines(prevLines => 
      prevLines.map(line => 
        line.id === id 
          ? { ...line, isEditing: !line.isEditing } 
          : { ...line, isEditing: false }
      )
    );
  };

  // Update the value of a form line
  const updateFormLine = (id: string, newValue: string) => {
    setFormLines(prevLines => 
      prevLines.map(line => 
        line.id === id 
          ? { ...line, value: newValue, isEditing: false } 
          : line
      )
    );
  };

  // Cancel editing
  const cancelEdit = (id: string) => {
    setFormLines(prevLines => 
      prevLines.map(line => 
        line.id === id 
          ? { ...line, isEditing: false } 
          : line
      )
    );
  };

  // Save all form data
  const handleSaveAll = () => {
    console.log("Saving all form data:", formLines);
    // Here you would typically send the data to your backend
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <Title level={2} className="m-0">Form Menu</Title>
        <div className="flex gap-2">
          <Link to="/badges">
            <Button variant="outline">Back to Badges</Button>
          </Link>
          <Button onClick={handleSaveAll} className="flex items-center gap-1">
            <SaveIcon className="h-4 w-4" />
            Save All
          </Button>
        </div>
      </div>

      <Card className="mb-6 shadow-sm">
        <Menubar className="border-none p-0 bg-transparent">
          <MenubarMenu>
            <MenubarTrigger className="font-medium">File</MenubarTrigger>
            <MenubarContent>
              <MenubarItem onClick={handleSaveAll}>
                <SaveIcon className="h-4 w-4 mr-2" />
                Save
              </MenubarItem>
              <MenubarItem>
                <XIcon className="h-4 w-4 mr-2" />
                Cancel
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger className="font-medium">Edit</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                <EditIcon className="h-4 w-4 mr-2" />
                Edit All
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger className="font-medium">View</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                <CheckIcon className="h-4 w-4 mr-2" />
                Toggle Edit Mode
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </Card>

      <Card className="shadow-sm">
        <Form {...form}>
          <div className="space-y-4">
            {formLines.map((line) => (
              <div 
                key={line.id} 
                className={`p-3 rounded-md transition-colors ${line.isEditing ? 'bg-slate-50' : 'hover:bg-slate-50 cursor-pointer'}`}
                onClick={() => !line.isEditing && toggleEditMode(line.id)}
              >
                <FormField
                  name={line.id}
                  render={() => (
                    <FormItem className="flex items-center justify-between space-y-0">
                      <FormLabel className="font-medium min-w-32">{line.label}</FormLabel>
                      <div className="flex-1 max-w-md">
                        <FormControl>
                          {line.isEditing ? (
                            <div className="flex items-center gap-2">
                              {line.type === 'text' ? (
                                <Input 
                                  defaultValue={line.value}
                                  onChange={(e) => {
                                    const newLines = [...formLines];
                                    const index = newLines.findIndex(l => l.id === line.id);
                                    newLines[index] = { ...newLines[index], value: e.target.value };
                                    setFormLines(newLines);
                                  }}
                                  className="w-full"
                                  autoFocus
                                />
                              ) : (
                                <Select 
                                  defaultValue={line.value}
                                  onValueChange={(value) => {
                                    const newLines = [...formLines];
                                    const index = newLines.findIndex(l => l.id === line.id);
                                    newLines[index] = { ...newLines[index], value };
                                    setFormLines(newLines);
                                  }}
                                >
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select option" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {line.options?.map(option => (
                                      <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              )}
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateFormLine(line.id, line.value);
                                }}
                              >
                                <CheckIcon className="h-4 w-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  cancelEdit(line.id);
                                }}
                              >
                                <XIcon className="h-4 w-4" />
                              </Button>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between">
                              <span>
                                {line.type === 'dropdown' 
                                  ? line.options?.find(opt => opt.value === line.value)?.label 
                                  : line.value
                                }
                              </span>
                              <EditIcon className="h-4 w-4 text-gray-400" />
                            </div>
                          )}
                        </FormControl>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default FormMenu;
