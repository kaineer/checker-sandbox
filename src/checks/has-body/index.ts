// src/checks/has-body/index.ts

import {
  Checkable, CheckResources, CheckParams,
  Result,
  IncomeCheck,
  Statuses
} from "@htmlacademy/checker";

const { SUCCESS, FAIL } = Statuses;

/** TODO: проверить что в index.html есть body */

class HasBodyCheck implements Checkable {
  constructor(private projectPath: string, private params: CheckParams) {}

  public async check(
    resources: CheckResources,
    { pattern = "index.html", ignorePattern = [] }: IncomeCheck
  ): Promise<Result> {
    const htmlAst = await resources.projectResources["html-ast"]({
      pattern,
      ignorePattern,
    });

    const jsdom = htmlAst.resource.data["index.html"].data;
    const { window: { document: doc } } = jsdom;

    const failed = doc.querySelector("body") === null;

    return {
      title: "Has body check",
      message: failed ? "Has no body" : "Has body",
      check: "has-body",
      status: failed ? FAIL : SUCCESS
    };
  }
}

export default HasBodyCheck;
