import { Input } from "@/components/atoms/input";
import { cn } from "@/utils/classnames";

interface InputNumberProps {
  value: void | 0 | number;
  isSuffixPlural: boolean;
  className?: string;
  placeholder?: string;
  prefix?: string;
  suffix?: string;
  min?: number;
  max?: number;
  name: string;
  onChange: (e: { target: { name: string; value: number } }) => void;
}

export function InputNumber(props: InputNumberProps) {
  let {
    className,
    value,
    placeholder,
    name,
    min = 1,
    max = 1,
    prefix,
    suffix,
    isSuffixPlural,
  } = props;

  const onChange = (e: any) => {
    let value = String(e.target.value);

    if (+value <= max && +value >= min) {
      props.onChange({
        target: {
          name: name,
          value: +value,
        },
      });
    }
  };

  const minus = () => {
    if (+value > min) {
      value =
        min &&
        onChange({
          target: {
            name: name,
            value: +value - 1,
          },
        });
    }
  };

  const plus = () => {
    if (+value < max) {
      value =
        max &&
        onChange({
          target: {
            name: name,
            value: +value + 1,
          },
        });
    }
  };

  // 判断后缀是否需要变化（中文后缀不需要添加s）
  const renderSuffix = () => {
    if (!suffix) return "";
    
    // 如果后缀包含中文字符，则不添加s
    const hasChinese = /[\u4e00-\u9fa5]/.test(suffix);
    if (hasChinese) return suffix;
    
    // 英文后缀，根据数量添加s
    return `${suffix}${isSuffixPlural && +value > 1 ? "s" : ""}`;
  };

  return (
    <div className={cn("mt-2", className)}>
      <div className="relative">
        <button
          className="absolute left-0 top-0 flex h-[2.8125rem] w-[2.8125rem] shrink-0 items-center justify-center rounded-[0.25rem] bg-[#E74C3C] text-2xl font-bold text-white"
          onClick={minus}
        >
          -
        </button>
        <Input
          className="h-[2.8125rem] rounded-none border-none bg-[#F5F6F8] text-center focus-visible:ring-transparent"
          aria-label="number"
          min={min}
          max={max}
          readOnly
          name={name}
          placeholder={placeholder ? placeholder : "0"}
          value={`${prefix ? prefix : ""}${value}${renderSuffix()}`}
          onChange={onChange}
        />
        <button
          className="absolute right-0 top-0 flex h-[2.8125rem] w-[2.8125rem] shrink-0 items-center justify-center rounded-[0.25rem] bg-[#1ABC9C] text-2xl font-bold text-white"
          onClick={plus}
        >
          +
        </button>
      </div>
    </div>
  );
}
